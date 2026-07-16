import {
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, relative, resolve, sep } from "node:path";
import { findStarter, resolveTaskDir } from "./paths";
import { REPO_ROOT } from "./progress";
import type { StarterSnapshot } from "../shared/task-undo";

const STARTER_CANDIDATES = ["starter.ts", "starter.js", "src"] as const;

function toGitPath(path: string): string {
  return path.split(sep).join("/");
}

function git(repoRoot: string, args: string[]): Buffer {
  return execFileSync("git", ["-C", repoRoot, ...args], {
    maxBuffer: 32 * 1024 * 1024,
  });
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

function walkFiles(path: string): string[] {
  if (!statSync(path).isDirectory()) return [path];
  return readdirSync(path)
    .sort((left, right) => left.localeCompare(right))
    .flatMap((name) => walkFiles(resolve(path, name)));
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
  if (!STARTER_CANDIDATES.includes(artifactName as typeof STARTER_CANDIDATES[number])) {
    throw new Error(`nieobsługiwany starter: ${artifactName}`);
  }
  const kind = statSync(starterPath).isDirectory() ? "directory" : "file";
  return {
    artifactName: artifactName as StarterSnapshot["artifactName"],
    kind,
    files: walkFiles(starterPath).map((file) => ({
      path: kind === "directory"
        ? toGitPath(relative(starterPath, file))
        : artifactName,
      contentBase64: readFileSync(file).toString("base64"),
    })),
  };
}

function restoreDirectory(repoRoot: string, relativePath: string, destination: string): void {
  const files = git(repoRoot, ["ls-tree", "-r", "--name-only", "HEAD", "--", relativePath])
    .toString("utf8")
    .trim()
    .split("\n")
    .filter(Boolean);

  rmSync(destination, { recursive: true, force: true });
  mkdirSync(destination, { recursive: true });

  for (const file of files) {
    if (!file.startsWith(`${relativePath}/`)) {
      throw new Error(`nieprawidłowa ścieżka startera w Git: ${file}`);
    }
    const outputPath = resolve(repoRoot, file);
    const withinDestination =
      outputPath === destination || outputPath.startsWith(destination + sep);
    if (!withinDestination) {
      throw new Error(`plik startera poza katalogiem docelowym: ${file}`);
    }
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, git(repoRoot, ["show", `HEAD:${file}`]));
  }
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

  if (templateRelative.endsWith("/src")) {
    restoreDirectory(repoRoot, templateRelative, destination);
  } else {
    mkdirSync(dirname(destination), { recursive: true });
    writeFileSync(destination, git(repoRoot, ["show", `HEAD:${templateRelative}`]));
  }

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
    (snapshot.kind === "file" && (
      snapshot.files.length !== 1 ||
      snapshot.files[0]?.path !== snapshot.artifactName
    )) ||
    (snapshot.kind === "directory" && snapshot.files.length === 0)
  ) {
    throw new Error("nieprawidłowa kopia startera");
  }

  const taskDir = resolveTaskDir(taskId, resolve(repoRoot, "tracks"));
  const destination = resolve(taskDir, snapshot.artifactName);
  const withinTask = destination.startsWith(taskDir + sep);
  if (!withinTask) throw new Error("kopia startera wskazuje poza zadanie");

  const files = snapshot.files.map((file) => {
    if (!validSnapshotPath(file.path) || typeof file.contentBase64 !== "string") {
      throw new Error("nieprawidłowy plik w kopii startera");
    }
    const outputPath = snapshot.kind === "directory"
      ? resolve(destination, file.path)
      : destination;
    const withinDestination =
      outputPath === destination || outputPath.startsWith(destination + sep);
    if (!withinDestination) {
      throw new Error("plik kopii wskazuje poza starter");
    }
    return { ...file, outputPath };
  });

  if (snapshot.kind === "missing") {
    rmSync(destination, { recursive: true, force: true });
    return { starterPath: null, starterRel: null };
  }

  if (snapshot.kind === "directory") {
    rmSync(destination, { recursive: true, force: true });
    mkdirSync(destination, { recursive: true });
  } else {
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

export function restoreStarterSnapshot(
  taskId: string,
  snapshot: StarterSnapshot,
): RestoredStarter {
  return restoreStarterSnapshotInRepo(taskId, snapshot, REPO_ROOT);
}
