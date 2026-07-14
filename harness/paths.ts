import { resolve, sep, relative } from "node:path";
import { existsSync, statSync, readFileSync, readdirSync } from "node:fs";
import { REPO_ROOT } from "./progress";

export const TRACKS_ROOT = resolve(REPO_ROOT, "tracks");

export function resolveTaskDir(taskId: string): string {
  if (!taskId || typeof taskId !== "string") {
    throw new Error("taskId jest wymagany");
  }
  if (taskId.includes("\0")) {
    throw new Error(`nieprawidłowy taskId: ${taskId}`);
  }
  const dir = resolve(TRACKS_ROOT, taskId);
  const withinTracks = dir === TRACKS_ROOT || dir.startsWith(TRACKS_ROOT + sep);
  if (!withinTracks) {
    throw new Error(`taskId poza tracks/ (path traversal?): ${taskId}`);
  }
  return dir;
}

function isDir(p: string): boolean {
  return existsSync(p) && statSync(p).isDirectory();
}

/**
 * Multi-file task = level dir contains a `src/` directory (student-edited)
 * alongside a `_solution/` directory of the same shape.
 */
export function isMultiFile(taskDir: string): boolean {
  return isDir(resolve(taskDir, "src")) && isDir(resolve(taskDir, "_solution"));
}

/**
 * Path to the student-edited artefact: a `starter.{ts,js}` file for single-file
 * tasks, or the `src/` directory for multi-file tasks. `null` if neither exists.
 */
export function findStarter(taskDir: string): string | null {
  for (const ext of ["ts", "js"]) {
    const p = resolve(taskDir, `starter.${ext}`);
    if (existsSync(p)) return p;
  }
  const srcDir = resolve(taskDir, "src");
  if (isDir(srcDir)) return srcDir;
  return null;
}

/**
 * Path to the reference solution: a `_solution.{ts,js}` file for single-file
 * tasks, or the `_solution/` directory for multi-file tasks. `null` if neither.
 */
export function findSolution(taskDir: string): string | null {
  for (const ext of ["ts", "js"]) {
    const p = resolve(taskDir, `_solution.${ext}`);
    if (existsSync(p)) return p;
  }
  const solDir = resolve(taskDir, "_solution");
  if (isDir(solDir)) return solDir;
  return null;
}

function walkFiles(dir: string, base = dir): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir).sort((a, b) => a.localeCompare(b))) {
    const full = resolve(dir, name);
    if (statSync(full).isDirectory()) out.push(...walkFiles(full, base));
    else out.push(full);
  }
  return out;
}

/**
 * Renders a solution artefact as a string for the UI. Single-file: the file
 * body verbatim. Multi-file: every file under _solution/ concatenated, each
 * preceded by a `// ── <relative path> ──` header.
 */
export function readArtifactText(artifactPath: string): string {
  if (!statSync(artifactPath).isDirectory()) {
    return readFileSync(artifactPath, "utf8");
  }
  const files = walkFiles(artifactPath);
  return files
    .map((f) => {
      const rel = relative(artifactPath, f).split(sep).join("/");
      return `// ── ${rel} ──\n${readFileSync(f, "utf8")}`;
    })
    .join("\n");
}

export const readSolutionText = readArtifactText;
