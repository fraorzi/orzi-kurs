import {
  mkdirSync,
  lstatSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, relative, resolve, sep } from "node:path";
import { assertPathWithinRoot, findStarter, resolveTaskDir } from "./paths";
import { REPO_ROOT } from "./progress";
import { readInitialArtifact, writeArtifact } from "./initial-artifact";
import type { StarterSnapshot } from "../shared/task-undo";

const STARTER_CANDIDATES = [
  "starter.tsx",
  "starter.ts",
  "starter.jsx",
  "starter.js",
  "starter.sql",
  "src",
] as const;

function toGitPath(path: string): string {
  return path.split(sep).join("/");
}

function trackedAtHead(repoRoot: string, relativePath: string): boolean {
  try {
    execFileSync("git", ["-C", repoRoot, "cat-file", "-e", `HEAD:${relativePath}`], {
      stdio: "ignore",
    });
    return true;
  } catch {
    return false;
  }
}

function starterTemplatePath(taskDir: string, repoRoot: string): string | null {
  const taskRelative = toGitPath(relative(repoRoot, taskDir));
  for (const candidate of STARTER_CANDIDATES) {
    const candidateRelative = `${taskRelative}/${candidate}`;
    if (trackedAtHead(repoRoot, candidateRelative)) return candidateRelative;
  }
  return null;
}

function walkFiles(path: string, root: string): string[] {
  assertPathWithinRoot(path, root);
  if (!statSync(path).isDirectory()) return [path];
  return readdirSync(path)
    .sort((left, right) => left.localeCompare(right))
    .flatMap((name) => walkFiles(resolve(path, name), root));
}

function removeDestinationForWrite(destination: string, root: string): void {
  assertPathWithinRoot(dirname(destination), root);
  try {
    lstatSync(destination);
    rmSync(destination, { recursive: true, force: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
}

function validSnapshotPath(path: string): boolean {
  const parts = path.split("/");
  return Boolean(
    path &&
    !path.includes("\0") &&
    !path.startsWith("/") &&
    parts.every((part) => part !== "" && part !== "." && part !== ".."),
  );
}

export function captureStarterSnapshotInRepo(
  taskId: string,
  repoRoot: string,
): StarterSnapshot | null {
  const taskDir = resolveTaskDir(taskId, resolve(repoRoot, "tracks"));
  const starterPath = findStarter(taskDir);
  if (!starterPath) {
    const templateRelative = starterTemplatePath(taskDir, repoRoot);
    if (!templateRelative) return null;
    const artifactName = relative(taskDir, resolve(repoRoot, templateRelative));
    return {
      artifactName: artifactName as StarterSnapshot["artifactName"],
      kind: "missing",
      files: [],
    };
  }

  const artifactName = relative(taskDir, starterPath);
  if (!STARTER_CANDIDATES.includes(artifactName as (typeof STARTER_CANDIDATES)[number])) {
    throw new Error(`nieobsługiwany starter: ${artifactName}`);
  }
  assertPathWithinRoot(starterPath, taskDir);
  const kind = statSync(starterPath).isDirectory() ? "directory" : "file";
  return {
    artifactName: artifactName as StarterSnapshot["artifactName"],
    kind,
    files: walkFiles(starterPath, taskDir).map((file) => {
      return {
        path: kind === "directory" ? toGitPath(relative(starterPath, file)) : artifactName,
        contentBase64: readFileSync(file).toString("base64"),
      };
    }),
  };
}

export interface RestoredStarter {
  starterPath: string | null;
  starterRel: string | null;
}

export function restoreStarterCodeInRepo(taskId: string, repoRoot: string): RestoredStarter {
  const taskDir = resolveTaskDir(taskId, resolve(repoRoot, "tracks"));
  const templateRelative = starterTemplatePath(taskDir, repoRoot);
  if (!templateRelative) {
    throw new Error("zadanie nie ma startera zapisanego w aktualnym commicie");
  }

  const destination = resolve(repoRoot, templateRelative);
  const initial = readInitialArtifact(destination, repoRoot);
  if (!initial) throw new Error("nie udało się odczytać pierwotnej wersji startera z Git");
  writeArtifact(destination, initial);

  return {
    starterPath: destination,
    starterRel: templateRelative,
  };
}

export function restoreStarterCode(taskId: string): RestoredStarter {
  return restoreStarterCodeInRepo(taskId, REPO_ROOT);
}

export function captureStarterSnapshot(taskId: string): StarterSnapshot | null {
  return captureStarterSnapshotInRepo(taskId, REPO_ROOT);
}

export function restoreStarterSnapshotInRepo(
  taskId: string,
  snapshot: StarterSnapshot,
  repoRoot: string,
): RestoredStarter {
  if (
    !STARTER_CANDIDATES.includes(snapshot.artifactName) ||
    !["file", "directory", "missing"].includes(snapshot.kind) ||
    (snapshot.kind === "file" && snapshot.artifactName === "src") ||
    (snapshot.kind === "directory" && snapshot.artifactName !== "src") ||
    !Array.isArray(snapshot.files) ||
    (snapshot.kind === "missing" && snapshot.files.length !== 0) ||
    (snapshot.kind === "file" &&
      (snapshot.files.length !== 1 || snapshot.files[0]?.path !== snapshot.artifactName)) ||
    (snapshot.kind === "directory" && snapshot.files.length === 0)
  ) {
    throw new Error("nieprawidłowa kopia startera");
  }

  const taskDir = resolveTaskDir(taskId, resolve(repoRoot, "tracks"));
  const destination = resolve(taskDir, snapshot.artifactName);
  const withinTask = destination.startsWith(taskDir + sep);
  if (!withinTask) throw new Error("kopia startera wskazuje poza zadanie");
  assertPathWithinRoot(dirname(destination), taskDir);

  const files = snapshot.files.map((file) => {
    if (!validSnapshotPath(file.path) || typeof file.contentBase64 !== "string") {
      throw new Error("nieprawidłowy plik w kopii startera");
    }
    const outputPath =
      snapshot.kind === "directory" ? resolve(destination, file.path) : destination;
    const withinDestination =
      outputPath === destination || outputPath.startsWith(destination + sep);
    if (!withinDestination) {
      throw new Error("plik kopii wskazuje poza starter");
    }
    return { ...file, outputPath };
  });

  if (snapshot.kind === "missing") {
    removeDestinationForWrite(destination, taskDir);
    return { starterPath: null, starterRel: null };
  }

  if (snapshot.kind === "directory") {
    removeDestinationForWrite(destination, taskDir);
    mkdirSync(destination, { recursive: true });
  } else {
    removeDestinationForWrite(destination, taskDir);
    mkdirSync(dirname(destination), { recursive: true });
  }

  for (const file of files) {
    mkdirSync(dirname(file.outputPath), { recursive: true });
    writeFileSync(file.outputPath, Buffer.from(file.contentBase64, "base64"));
  }

  return {
    starterPath: destination,
    starterRel: toGitPath(relative(repoRoot, destination)),
  };
}

export function restoreStarterSnapshot(taskId: string, snapshot: StarterSnapshot): RestoredStarter {
  return restoreStarterSnapshotInRepo(taskId, snapshot, REPO_ROOT);
}
