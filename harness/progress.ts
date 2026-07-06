import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { Progress, TaskProgress } from "./types";

export const REPO_ROOT = process.cwd();
export const PROGRESS_PATH = join(REPO_ROOT, "progress.json");

export function readProgress(): Progress {
  if (!existsSync(PROGRESS_PATH)) {
    writeFileSync(PROGRESS_PATH, "{}\n", "utf8");
    return {};
  }
  const raw = readFileSync(PROGRESS_PATH, "utf8").trim();
  if (!raw) return {};
  return JSON.parse(raw) as Progress;
}

export function writeProgress(progress: Progress): void {
  writeFileSync(PROGRESS_PATH, JSON.stringify(progress, null, 2) + "\n", "utf8");
}

export function recordRun(taskId: string, passed: boolean): {
  progress: Progress;
  wasFirstPass: boolean;
} {
  const progress = readProgress();
  const now = new Date().toISOString();
  const prev: TaskProgress | undefined = progress[taskId];

  const alreadyPassed = prev?.status === "passed";
  const wasFirstPass = passed && !alreadyPassed;

  progress[taskId] = {
    status: passed ? "passed" : "failed",
    attempts: (prev?.attempts ?? 0) + 1,
    firstPassedAt: passed ? (prev?.firstPassedAt ?? now) : prev?.firstPassedAt,
    lastRunAt: now,
  };

  writeProgress(progress);
  return { progress, wasFirstPass };
}
