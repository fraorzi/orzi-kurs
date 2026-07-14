import { describe, expect, it } from "vitest";
import { evolveTaskProgress, resetTaskProgressState } from "./mastery";

describe("mastery", () => {
  it("schedules a clean first pass for the next day", () => {
    const progress = evolveTaskProgress(
      undefined,
      { passed: true, usedHint: false, durationMs: 120, failedTests: 0, lintErrors: 0 },
      "2026-07-14T10:00:00.000Z",
    );

    expect(progress.masteryScore).toBe(1);
    expect(progress.nextReviewAt).toBe("2026-07-15T10:00:00.000Z");
    expect(progress.history).toHaveLength(1);
  });

  it("moves a hint-assisted pass back one mastery level", () => {
    const progress = evolveTaskProgress(
      {
        status: "passed",
        attempts: 3,
        masteryScore: 3,
        cleanPassStreak: 3,
        lastRunAt: "2026-07-10T10:00:00.000Z",
      },
      { passed: true, usedHint: true, durationMs: 90, failedTests: 0, lintErrors: 0 },
      "2026-07-14T10:00:00.000Z",
    );

    expect(progress.status).toBe("passed-with-hint");
    expect(progress.masteryScore).toBe(2);
    expect(progress.cleanPassStreak).toBe(0);
    expect(progress.nextReviewAt).toBe("2026-07-14T10:00:00.000Z");
  });

  it("keeps a historical completion after a failed review", () => {
    const progress = evolveTaskProgress(
      {
        status: "passed",
        attempts: 2,
        masteryScore: 2,
        lastRunAt: "2026-07-10T10:00:00.000Z",
      },
      { passed: false, usedHint: false, durationMs: 95, failedTests: 1, lintErrors: 0 },
      "2026-07-14T10:00:00.000Z",
    );

    expect(progress.status).toBe("passed");
    expect(progress.lastAttemptPassed).toBe(false);
    expect(progress.masteryScore).toBe(1);
    expect(progress.nextReviewAt).toBe("2026-07-14T10:00:00.000Z");
  });

  it("resets active progress without deleting attempt history", () => {
    const progress = resetTaskProgressState({
      status: "failed",
      attempts: 2,
      masteryScore: 1,
      history: [
        {
          at: "2026-07-14T09:00:00.000Z",
          passed: false,
          usedHint: false,
          durationMs: 80,
          failedTests: 1,
          lintErrors: 0,
        },
      ],
      lastRunAt: "2026-07-14T09:00:00.000Z",
    }, "2026-07-14T10:00:00.000Z");

    expect(progress.status).toBe("not-started");
    expect(progress.masteryScore).toBe(0);
    expect(progress.attempts).toBe(2);
    expect(progress.history).toHaveLength(1);
    expect(progress.resetCount).toBe(1);
  });
});
