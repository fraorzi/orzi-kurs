import { describe, expect, it } from "vitest";
import { evolveTaskProgress, resetTaskProgressState } from "./mastery";
import type { TaskProgress } from "./types";

describe("mastery", () => {
  it("schedules a clean first pass for the next day", () => {
    const progress = evolveTaskProgress(
      undefined,
      { passed: true, usedHint: false },
      "2026-07-14T10:00:00.000Z",
    );

    expect(progress.masteryScore).toBe(1);
    expect(progress.nextReviewAt).toBe("2026-07-15T10:00:00.000Z");
    expect(progress.attempts).toBe(1);
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
      { passed: true, usedHint: true },
      "2026-07-14T10:00:00.000Z",
    );

    expect(progress.status).toBe("passed-with-hint");
    expect(progress.masteryScore).toBe(2);
    expect(progress.cleanPassStreak).toBe(0);
    expect(progress.nextReviewAt).toBe("2026-07-14T10:00:00.000Z");
  });

  it("treats a revealed hint as used after the page has been refreshed", () => {
    const progress = evolveTaskProgress(
      {
        status: "failed",
        attempts: 1,
        masteryScore: 2,
        revealedHints: 1,
        lastRunAt: "2026-07-10T10:00:00.000Z",
      },
      { passed: true, usedHint: false },
      "2026-07-14T10:00:00.000Z",
    );

    expect(progress.status).toBe("passed-with-hint");
    expect(progress.masteryScore).toBe(1);
    expect(progress.revealedHints).toBe(1);
    expect(progress.firstPassedWithHintAt).toBe("2026-07-14T10:00:00.000Z");
    expect(progress.firstPassedWithoutHintAt).toBeUndefined();
  });

  it("allows a clean pass after the persistent hint state is cleared", () => {
    const progress = evolveTaskProgress(
      {
        status: "passed-with-hint",
        attempts: 1,
        masteryScore: 1,
        revealedHints: 0,
        firstPassedWithHintAt: "2026-07-13T10:00:00.000Z",
        lastRunAt: "2026-07-13T10:00:00.000Z",
      },
      { passed: true, usedHint: false },
      "2026-07-14T10:00:00.000Z",
    );

    expect(progress.status).toBe("passed");
    expect(progress.masteryScore).toBe(2);
    expect(progress.firstPassedWithHintAt).toBe("2026-07-13T10:00:00.000Z");
    expect(progress.firstPassedWithoutHintAt).toBe("2026-07-14T10:00:00.000Z");
  });

  it("keeps a historical completion after a failed review", () => {
    const progress = evolveTaskProgress(
      {
        status: "passed",
        attempts: 2,
        masteryScore: 2,
        verifiedStarter: "export const answer = 42;\n",
        lastRunAt: "2026-07-10T10:00:00.000Z",
      },
      { passed: false, usedHint: false },
      "2026-07-14T10:00:00.000Z",
    );

    expect(progress.status).toBe("passed");
    expect(progress.lastAttemptPassed).toBe(false);
    expect(progress.masteryScore).toBe(1);
    expect(progress.nextReviewAt).toBe("2026-07-14T10:00:00.000Z");
    expect(progress.verifiedStarter).toBe("export const answer = 42;\n");
  });

  it("stores the source snapshot associated with a passing attempt", () => {
    const progress = evolveTaskProgress(
      undefined,
      {
        passed: true,
        usedHint: false,
        verifiedStarter: "export const answer = 42;\n",
      },
      "2026-07-14T10:00:00.000Z",
    );

    expect(progress.verifiedStarter).toBe("export const answer = 42;\n");
  });

  it("resets active progress and removes legacy attempt history", () => {
    const legacyProgress = {
      status: "failed",
      attempts: 2,
      masteryScore: 1,
      history: [{ passed: false }],
      lastRunAt: "2026-07-14T09:00:00.000Z",
    } as TaskProgress & { history: unknown };
    const progress = resetTaskProgressState(legacyProgress, "2026-07-14T10:00:00.000Z");

    expect(progress.status).toBe("not-started");
    expect(progress.masteryScore).toBe(0);
    expect(progress.attempts).toBe(0);
    expect("history" in progress).toBe(false);
    expect(progress.resetCount).toBe(1);
  });
});
