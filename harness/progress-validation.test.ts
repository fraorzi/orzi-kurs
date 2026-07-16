import { describe, expect, it } from "vitest";
import { isTaskProgress } from "./progress-validation";

const validProgress = {
  status: "passed",
  attempts: 2,
  masteryScore: 2,
  cleanPassStreak: 1,
  nextReviewAt: "2026-07-17T10:00:00.000Z",
  lastAttemptPassed: true,
  resetCount: 1,
  lastResetAt: "2026-07-15T10:00:00.000Z",
  firstPassedAt: "2026-07-14T10:00:00.000Z",
  firstPassedWithHintAt: "2026-07-14T10:00:00.000Z",
  firstPassedWithoutHintAt: "2026-07-16T10:00:00.000Z",
  verifiedStarter: "export const answer = 42;\n",
  lastRunAt: "2026-07-16T10:00:00.000Z",
} as const;

describe("task progress validation", () => {
  it("accepts the complete persisted contract", () => {
    expect(isTaskProgress(validProgress)).toBe(true);
  });

  it.each([
    { ...validProgress, attempts: -1 },
    { ...validProgress, attempts: 1.5 },
    { ...validProgress, masteryScore: 5 },
    { ...validProgress, cleanPassStreak: -1 },
    { ...validProgress, lastAttemptPassed: "yes" },
    { ...validProgress, nextReviewAt: "tomorrow" },
    { ...validProgress, lastRunAt: "2026-07-16" },
    { ...validProgress, unexpected: true },
  ])("rejects malformed persisted progress", (progress) => {
    expect(isTaskProgress(progress)).toBe(false);
  });
});
