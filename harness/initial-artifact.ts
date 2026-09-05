import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, join, relative, resolve, sep } from "node:path";
import { spawnSync } from "node:child_process";
import { REPO_ROOT } from "./progress";
import { assertPathWithinRoot } from "./paths";

export type ArtifactSnapshot =
  | { kind: "file"; content: string }
  | { kind: "directory"; files: Array<{ path: string; content: string }> };

function git(args: string[], repoRoot: string): string {
  const result = spawnSync("git", args, {
    cwd: repoRoot,
    encoding: "utf8",
  });
  if (result.status !== 0) {
    throw new Error(result.stderr.trim() || `git ${args.join(" ")} nie powiódł się`);
  }
  return result.stdout;
}

function gitPath(path: string): string {
  return path.split(sep).join("/");
}

export function readCurrentArtifact(artifactPath: string): ArtifactSnapshot {
  if (!statSync(artifactPath).isDirectory()) {
    return { kind: "file", content: readFileSync(artifactPath, "utf8") };
  }

  const files: Array<{ path: string; content: string }> = [];
  const walk = (directory: string): void => {
    for (const name of readdirSync(directory).sort((a, b) => a.localeCompare(b))) {
      const path = join(directory, name);
      assertPathWithinRoot(path, artifactPath);
      if (statSync(path).isDirectory()) {
        walk(path);
      } else {
        files.push({
          path: gitPath(relative(artifactPath, path)),
          content: readFileSync(path, "utf8"),
        });
      }
    }
  };
  walk(artifactPath);
  return { kind: "directory", files };
}

export function readInitialArtifact(
  artifactPath: string,
  repoRoot = REPO_ROOT,
): ArtifactSnapshot | null {
  const artifactRelative = gitPath(relative(repoRoot, artifactPath));
  if (artifactRelative.startsWith("../") || artifactRelative === "..") {
    throw new Error("artefakt znajduje się poza repozytorium");
  }

  // Curriculum templates are independent of the student's editable files and commits.
  const template = join(
    dirname(artifactPath),
    basename(artifactPath) === "src" ? "_starter" : `_${basename(artifactPath)}`,
  );
  if (existsSync(template)) {
    assertPathWithinRoot(template, repoRoot);
    return readCurrentArtifact(template);
  }

  const additionCommit = git(
    ["log", "--reverse", "--diff-filter=A", "--format=%H", "--", artifactRelative],
    repoRoot,
  )
    .trim()
    .split("\n")[0];
  if (!additionCommit) return null;

  const isDirectory = existsSync(artifactPath)
    ? statSync(artifactPath).isDirectory()
    : artifactRelative.endsWith("/src");

  if (!isDirectory) {
    return {
      kind: "file",
      content: git(["show", `${additionCommit}:${artifactRelative}`], repoRoot),
    };
  }

  const prefix = artifactRelative.endsWith("/") ? artifactRelative : `${artifactRelative}/`;
  const trackedFiles = git(
    ["ls-tree", "-r", "--name-only", additionCommit, "--", artifactRelative],
    repoRoot,
  )
    .trim()
    .split("\n")
    .filter(Boolean)
    .filter((path) => path.startsWith(prefix))
    .filter((path) => !path.includes("/.idea/") && !path.endsWith("/.DS_Store"));

  return {
    kind: "directory",
    files: trackedFiles.map((path) => ({
      path: path.slice(prefix.length),
      content: git(["show", `${additionCommit}:${path}`], repoRoot),
    })),
  };
}

export function writeArtifact(artifactPath: string, snapshot: ArtifactSnapshot): void {
  rmSync(artifactPath, { recursive: true, force: true });
  if (snapshot.kind === "file") {
    mkdirSync(dirname(artifactPath), { recursive: true });
    writeFileSync(artifactPath, snapshot.content, "utf8");
    return;
  }

  mkdirSync(artifactPath, { recursive: true });
  for (const file of snapshot.files) {
    const destination = resolve(artifactPath, file.path);
    if (destination !== artifactPath && !destination.startsWith(artifactPath + sep)) {
      throw new Error(`plik artefaktu wychodzi poza katalog: ${file.path}`);
    }
    mkdirSync(dirname(destination), { recursive: true });
    writeFileSync(destination, file.content, "utf8");
  }
}

export async function withInitialArtifact<T>(
  artifactPath: string,
  callback: () => Promise<T>,
  repoRoot = REPO_ROOT,
): Promise<T> {
  if (!existsSync(artifactPath)) {
    throw new Error(`brak artefaktu: ${artifactPath}`);
  }
  const current = readCurrentArtifact(artifactPath);
  const initial = readInitialArtifact(artifactPath, repoRoot) ?? current;
  writeArtifact(artifactPath, initial);
  try {
    return await callback();
  } finally {
    writeArtifact(artifactPath, current);
  }
}
