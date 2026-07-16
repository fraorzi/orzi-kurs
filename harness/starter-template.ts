import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { execFileSync } from "node:child_process";
import { basename, dirname, join, relative, resolve, sep } from "node:path";
import { findStarter, resolveTaskDir } from "./paths";
import { REPO_ROOT } from "./progress";

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

function createBackup(artifactPath: string, taskId: string, repoRoot: string): string | null {
  if (!existsSync(artifactPath)) return null;

  const timestamp = new Date().toISOString().replaceAll(":", "-").replaceAll(".", "-");
  const backupDir = join(repoRoot, ".orzi", "backups", ...taskId.split("/"), timestamp);
  mkdirSync(backupDir, { recursive: true });

  const backupPath = join(backupDir, basename(artifactPath));
  if (statSync(artifactPath).isDirectory()) {
    cpSync(artifactPath, backupPath, { recursive: true });
  } else {
    copyFileSync(artifactPath, backupPath);
  }
  return toGitPath(relative(repoRoot, backupPath));
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
  starterPath: string;
  starterRel: string;
  backupRel: string | null;
}

export function restoreStarterCodeInRepo(taskId: string, repoRoot: string): RestoredStarter {
  const taskDir = resolveTaskDir(taskId, resolve(repoRoot, "tracks"));
  const templateRelative = starterTemplatePath(taskDir, repoRoot);
  if (!templateRelative) {
    throw new Error("zadanie nie ma startera zapisanego w aktualnym commicie");
  }

  const destination = resolve(repoRoot, templateRelative);
  const existingStarter = findStarter(taskDir);
  const backupRel = createBackup(existingStarter ?? destination, taskId, repoRoot);

  if (templateRelative.endsWith("/src")) {
    restoreDirectory(repoRoot, templateRelative, destination);
  } else {
    mkdirSync(dirname(destination), { recursive: true });
    writeFileSync(destination, git(repoRoot, ["show", `HEAD:${templateRelative}`]));
  }

  return {
    starterPath: destination,
    starterRel: templateRelative,
    backupRel,
  };
}

export function restoreStarterCode(taskId: string): RestoredStarter {
  return restoreStarterCodeInRepo(taskId, REPO_ROOT);
}
