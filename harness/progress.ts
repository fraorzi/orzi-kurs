import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { Progress } from "./types";
import { evolveTaskProgress, resetTaskProgressState, type RecordedAttempt } from "./mastery";

export const REPO_ROOT = process.cwd();
export const PROGRESS_PATH = join(REPO_ROOT, "progress.json");

export function readProgress(): Progress {
  if (!existsSync(PROGRESS_PATH)) {
    writeFileSync(PROGRESS_PATH, "{}\n", "utf8");
    return {};
  }
  const raw = readFileSync(PROGRESS_PATH, "utf8").trim();
  if (!raw) return {};
  const progress = JSON.parse(raw) as Record<string, Progress[string] & { history?: unknown }>;
  let removedHistory = false;
  for (const taskProgress of Object.values(progress)) {
    if ("history" in taskProgress) {
      delete taskProgress.history;
      removedHistory = true;
    }
  }
  if (removedHistory) writeProgress(progress);
  return progress;
}

export function writeProgress(progress: Progress): void {
  writeFileSync(PROGRESS_PATH, JSON.stringify(progress, null, 2) + "\n", "utf8");
}

export function recordRun(taskId: string, attempt: RecordedAttempt): {
  progress: Progress;
  taskProgress: Progress[string];
} {
  const progress = readProgress();
  progress[taskId] = evolveTaskProgress(progress[taskId], attempt);

  writeProgress(progress);
  return { progress, taskProgress: progress[taskId] };
}

export function resetTaskProgress(taskId: string): Progress[string] | null {
  const progress = readProgress();
  if (!progress[taskId]) return null;
  progress[taskId] = resetTaskProgressState(progress[taskId]);
  writeProgress(progress);
  return progress[taskId];
}
