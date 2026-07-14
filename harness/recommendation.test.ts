import { describe, expect, it } from "vitest";
import type { CatalogTrack } from "./catalog";
import { recommendTask } from "./recommendation";
import type { Progress } from "./types";

const track: CatalogTrack = {
  id: "js",
  topics: [
    {
      id: "js/01-a",
      title: "A",
      levels: [
        { id: "easy", status: "passed", attempts: 1, masteryScore: 1 },
        { id: "medium", status: "failed", attempts: 1, masteryScore: 0 },
      ],
    },
    {
      id: "js/02-b",
      title: "B",
      levels: [
        { id: "easy", status: "passed-with-hint", attempts: 1, masteryScore: 1 },
        { id: "medium", status: "not-started", attempts: 0, masteryScore: 0 },
      ],
    },
  ],
};

function progress(status: Progress[string]["status"], nextReviewAt?: string): Progress[string] {
  return { status, attempts: 1, masteryScore: 1, nextReviewAt, lastRunAt: "2026-07-10T10:00:00.000Z" };
}

describe("recommendTask", () => {
  it("prioritizes a failed task over hinted and new tasks", () => {
    const recommendation = recommendTask(track, {
      "js/01-a/easy": progress("passed", "2026-07-01T10:00:00.000Z"),
      "js/01-a/medium": progress("failed"),
      "js/02-b/easy": progress("passed-with-hint"),
    }, undefined, new Date("2026-07-14T10:00:00.000Z"));

    expect(recommendation?.taskId).toBe("js/01-a/medium");
    expect(recommendation?.reason).toBe("retry-failed");
  });

  it("chooses a hinted task before a due review and new material", () => {
    const recommendation = recommendTask(track, {
      "js/01-a/easy": progress("passed", "2026-07-01T10:00:00.000Z"),
      "js/01-a/medium": progress("passed", "2026-08-01T10:00:00.000Z"),
      "js/02-b/easy": progress("passed-with-hint"),
    }, undefined, new Date("2026-07-14T10:00:00.000Z"));

    expect(recommendation?.taskId).toBe("js/02-b/easy");
    expect(recommendation?.reason).toBe("retry-without-hint");
  });
});
