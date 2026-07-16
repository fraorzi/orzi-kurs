import type { TaskProgress } from "./types";

const REVIEW_DAYS = [0, 1, 3, 7, 21] as const;

export interface RecordedAttempt {
  passed: boolean;
  usedHint: boolean;
  verifiedStarter?: string;
}

function addDays(iso: string, days: number): string {
  const date = new Date(iso);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString();
}

export function masteryScore(progress?: TaskProgress): number {
  if (progress?.masteryScore !== undefined) {
    return Math.max(0, Math.min(4, Math.round(progress.masteryScore)));
  }
  return progress?.status === "passed" || progress?.status === "passed-with-hint" ? 1 : 0;
}

export function evolveTaskProgress(
  previous: TaskProgress | undefined,
  attempt: RecordedAttempt,
  now = new Date().toISOString(),
): TaskProgress {
  const previousScore = masteryScore(previous);
  const score = attempt.passed
    ? attempt.usedHint
      ? Math.max(1, previousScore - 1)
      : Math.min(4, previousScore + 1)
    : Math.max(0, previousScore - 1);
  return {
    status: attempt.passed
      ? attempt.usedHint
        ? "passed-with-hint"
        : "passed"
      : previous?.status === "passed" || previous?.status === "passed-with-hint"
        ? previous.status
        : "failed",
    attempts: (previous?.attempts ?? 0) + 1,
    masteryScore: score,
    cleanPassStreak:
      attempt.passed && !attempt.usedHint ? (previous?.cleanPassStreak ?? 0) + 1 : 0,
    nextReviewAt:
      attempt.passed && !attempt.usedHint ? addDays(now, REVIEW_DAYS[score]) : now,
    lastAttemptPassed: attempt.passed,
    resetCount: previous?.resetCount,
    lastResetAt: previous?.lastResetAt,
    firstPassedAt: attempt.passed ? (previous?.firstPassedAt ?? now) : previous?.firstPassedAt,
    firstPassedWithHintAt:
      attempt.passed && attempt.usedHint
        ? (previous?.firstPassedWithHintAt ?? now)
        : previous?.firstPassedWithHintAt,
    firstPassedWithoutHintAt:
      attempt.passed && !attempt.usedHint
        ? (previous?.firstPassedWithoutHintAt ?? now)
        : previous?.firstPassedWithoutHintAt,
    verifiedStarter: attempt.passed
      ? (attempt.verifiedStarter ?? previous?.verifiedStarter)
      : previous?.verifiedStarter,
    lastRunAt: now,
  };
}

export function resetTaskProgressState(
  previous: TaskProgress,
  now = new Date().toISOString(),
): TaskProgress {
  const cleanPrevious = { ...previous } as TaskProgress & { history?: unknown };
  delete cleanPrevious.history;
  return {
    ...cleanPrevious,
    status: "not-started",
    attempts: 0,
    masteryScore: 0,
    cleanPassStreak: 0,
    nextReviewAt: undefined,
    lastAttemptPassed: undefined,
    verifiedStarter: undefined,
    resetCount: (previous.resetCount ?? 0) + 1,
    lastResetAt: now,
  };
}

export function isReviewDue(progress: TaskProgress | undefined, now = new Date()): boolean {
  return Boolean(progress?.nextReviewAt && new Date(progress.nextReviewAt) <= now);
}
