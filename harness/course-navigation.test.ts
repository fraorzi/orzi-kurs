import { describe, expect, it } from "vitest";
import type { CatalogTrack } from "../app/lib/types";
import { courseFilter, courseQuery, matchesCourseFilter, nextUnfinishedTask, selectedCourseStage, courseStagePercent, courseStageForTopic } from "../app/lib/course-navigation";
import { nextTaskInTrack } from "./task-navigation";
import { renderToStaticMarkup } from "react-dom/server";
import LevelPage from "../app/track/[track]/[topic]/[level]/page";
import TopicPage from "../app/track/[track]/[topic]/page";

const track: CatalogTrack = { id: "react", topics: [
  { id: "react/04-immutable-state", title: "Stan", levels: [
    { id: "easy", status: "passed", attempts: 1, masteryScore: 1 },
    { id: "medium", status: "passed-with-hint", attempts: 1, masteryScore: 1 },
    { id: "hard", status: "not-started", attempts: 0, masteryScore: 0 },
  ] },
  { id: "react/07-effects-synchronization", title: "Efekty", levels: [
    { id: "easy", status: "failed", attempts: 2, masteryScore: 0, lastRunAt: "2026-09-14T12:00:00Z" },
  ] },
] };
const now = "2026-09-14T13:00:00Z";

describe("course navigation", () => {
  it("includes unfinished levels in a partially completed topic and keeps hinted passes completed", () => {
    expect(track.topics[0].levels.filter((level) => matchesCourseFilter(level, "todo", now)).map((level) => level.id)).toEqual(["hard"]);
    expect(track.topics[0].levels.filter((level) => matchesCourseFilter(level, "done", now)).map((level) => level.id)).toEqual(["easy", "medium"]);
  });
  it("resumes an unfinished attempt without replacing it by a completed review", () => {
    expect(nextUnfinishedTask(track.topics)?.topic.id).toBe("react/07-effects-synchronization");
    expect(selectedCourseStage(track)?.id).toBe("escape-hatches");
    expect(selectedCourseStage(track, "fundamenty-ui")?.id).toBe("fundamenty-ui");
  });
  it("keeps a complete course accessible without inventing another task", () => {
    const done = { ...track, topics: [track.topics[0]] };
    done.topics = done.topics.map((topic) => ({ ...topic, levels: topic.levels.filter((level) => level.id !== "hard") }));
    expect(nextUnfinishedTask(done.topics)).toBeNull();
    expect(selectedCourseStage(done)?.id).toBe("fundamenty-ui");
  });
  it("normalizes unknown query values and encodes navigation context", () => {
    expect(courseFilter("bad")).toBe("todo");
    expect(courseQuery("fundamenty-ui", "review")).toBe("stage=fundamenty-ui&filter=review");
    expect(courseStagePercent(3, 8)).toBe(38);
    expect(courseStagePercent(0, 0)).toBe(0);
  });
  it("uses the destination topic's stage when continuing across a stage boundary", () => {
    const next = nextTaskInTrack(track, "react/04-immutable-state/hard");
    expect(next?.taskId).toBe("react/07-effects-synchronization/easy");
    expect(courseStageForTopic(track, "react/04-immutable-state")?.id).toBe("fundamenty-ui");
    expect(courseStageForTopic(track, next?.taskId.split("/").slice(0, -1).join("/") ?? "")?.id).toBe("escape-hatches");
    expect(courseStageForTopic(track, "react/missing")).toBeUndefined();
  });
  it("repairs stale stage context in both task and theory links while keeping the filter", async () => {
    const params = { track: "react", topic: "07-effects-synchronization", level: "easy" };
    const searchParams = { stage: "fundamenty-ui", filter: "review" };
    for (const page of [
      await LevelPage({ params: Promise.resolve(params), searchParams: Promise.resolve(searchParams) }),
      await TopicPage({ params: Promise.resolve(params), searchParams: Promise.resolve(searchParams) }),
    ]) {
      const html = renderToStaticMarkup(page);
      expect(html).toContain('href="/track/react?stage=escape-hatches&amp;filter=review"');
      expect(html).not.toContain("stage=fundamenty-ui");
    }
  });
  it("does not forward the previous stage to the next task", async () => {
    const page = await LevelPage({
      params: Promise.resolve({ track: "react", topic: "06-derived-state-no-effect", level: "hard" }),
      searchParams: Promise.resolve({ stage: "fundamenty-ui", filter: "review" }),
    });
    expect(page).toMatchObject({ props: {
      nextTaskHref: "/track/react/07-effects-synchronization/easy?filter=review",
    } });
  });
});
