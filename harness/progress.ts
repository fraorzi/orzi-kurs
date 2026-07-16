import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { isDeepStrictEqual } from "node:util";
import type { Progress, TaskProgress } from "./types";
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

export class ProgressConflictError extends Error {}

export function resetTaskProgress(
  taskId: string,
  expectedProgress: TaskProgress,
): { progress: TaskProgress | null; previousProgress: TaskProgress | null } {
  const progress = readProgress();
  const previousProgress = progress[taskId] ?? null;
  if (!previousProgress) {
    return { progress: null, previousProgress: null };
  }
  if (!isDeepStrictEqual(previousProgress, expectedProgress)) {
    throw new ProgressConflictError(
      "postęp zmienił się od ostatniego odczytu — odśwież stronę i spróbuj ponownie",
    );
  }
  progress[taskId] = resetTaskProgressState(previousProgress);
  writeProgress(progress);
  return { progress: progress[taskId], previousProgress };
}

export function restoreTaskProgress(taskId: string, taskProgress: TaskProgress): TaskProgress {
  const progress = readProgress();
  progress[taskId] = taskProgress;
  writeProgress(progress);
  return taskProgress;
}
