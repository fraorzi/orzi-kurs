import type { TaskProgress } from "./types";

const TASK_PROGRESS_KEYS = new Set<keyof TaskProgress>([
  "status",
  "attempts",
  "masteryScore",
  "cleanPassStreak",
  "nextReviewAt",
  "lastAttemptPassed",
  "resetCount",
  "lastResetAt",
  "firstPassedAt",
  "firstPassedWithHintAt",
  "firstPassedWithoutHintAt",
  "verifiedStarter",
  "lastRunAt",
]);

function isNonnegativeInteger(value: unknown): value is number {
  return Number.isInteger(value) && (value as number) >= 0;
}

function isIsoTimestamp(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    return new Date(value).toISOString() === value;
  } catch {
    return false;
  }
}

function isOptional(
  value: unknown,
  predicate: (candidate: unknown) => boolean,
): boolean {
  return value === undefined || predicate(value);
}

export function isTaskProgress(value: unknown): value is TaskProgress {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const progress = value as Partial<TaskProgress>;

  return (
    Object.keys(progress).every((key) => TASK_PROGRESS_KEYS.has(key as keyof TaskProgress)) &&
    ["passed", "passed-with-hint", "failed", "not-started"].includes(progress.status ?? "") &&
    isNonnegativeInteger(progress.attempts) &&
    isOptional(
      progress.masteryScore,
      (candidate) => isNonnegativeInteger(candidate) && (candidate as number) <= 4,
    ) &&
    isOptional(progress.cleanPassStreak, isNonnegativeInteger) &&
    isOptional(progress.nextReviewAt, isIsoTimestamp) &&
    isOptional(progress.lastAttemptPassed, (candidate) => typeof candidate === "boolean") &&
    isOptional(progress.resetCount, isNonnegativeInteger) &&
    isOptional(progress.lastResetAt, isIsoTimestamp) &&
    isOptional(progress.firstPassedAt, isIsoTimestamp) &&
    isOptional(progress.firstPassedWithHintAt, isIsoTimestamp) &&
    isOptional(progress.firstPassedWithoutHintAt, isIsoTimestamp) &&
    isOptional(progress.verifiedStarter, (candidate) => typeof candidate === "string") &&
    isIsoTimestamp(progress.lastRunAt)
  );
}
