import { resolve, sep } from "node:path";
import { existsSync } from "node:fs";
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

export function findStarter(taskDir: string): string | null {
  for (const ext of ["ts", "js"]) {
    const p = resolve(taskDir, `starter.${ext}`);
    if (existsSync(p)) return p;
  }
  return null;
}

export function findSolution(taskDir: string): string | null {
  for (const ext of ["ts", "js"]) {
    const p = resolve(taskDir, `_solution.${ext}`);
    if (existsSync(p)) return p;
  }
  return null;
}
