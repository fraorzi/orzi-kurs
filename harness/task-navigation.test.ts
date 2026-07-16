import { describe, expect, it } from "vitest";
import type { CatalogTrack } from "./catalog";
import { nextTaskInTrack } from "./task-navigation";

const track: CatalogTrack = {
  id: "js",
  topics: [
    {
      id: "js/01-a",
      title: "A",
      levels: [
        { id: "easy", status: "passed", attempts: 1, masteryScore: 1 },
        { id: "medium", status: "failed", attempts: 1, masteryScore: 0 },
        { id: "hard", status: "not-started", attempts: 0, masteryScore: 0 },
      ],
    },
    {
      id: "js/02-b",
      title: "B",
      levels: [
        { id: "easy", status: "passed-with-hint", attempts: 1, masteryScore: 1 },
        { id: "medium", status: "not-started", attempts: 0, masteryScore: 0 },
        { id: "hard", status: "not-started", attempts: 0, masteryScore: 0 },
      ],
    },
  ],
};

describe("nextTaskInTrack", () => {
  it("moves to the next difficulty regardless of progress status", () => {
    expect(nextTaskInTrack(track, "js/01-a/easy")?.taskId).toBe("js/01-a/medium");
    expect(nextTaskInTrack(track, "js/01-a/medium")?.taskId).toBe("js/01-a/hard");
  });

  it("moves from hard to easy in the next numbered topic", () => {
    expect(nextTaskInTrack(track, "js/01-a/hard")?.taskId).toBe("js/02-b/easy");
  });

  it("returns null after the final task", () => {
    expect(nextTaskInTrack(track, "js/02-b/hard")).toBeNull();
  });
});
