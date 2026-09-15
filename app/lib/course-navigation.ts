import type { CatalogLevel, CatalogTrack } from "./types";
import { isCompletedStatus, isReviewDue, learningModules, type LearningModule } from "./tracks";

export const COURSE_FILTERS = [
  ["todo", "Do zrobienia"],
  ["done", "Zaliczone"],
  ["all", "Wszystkie"],
  ["review", "Powtórki"],
] as const;
export type CourseFilter = (typeof COURSE_FILTERS)[number][0];

export function courseFilter(value: string | null | undefined): CourseFilter {
  return COURSE_FILTERS.find(([key]) => key === value)?.[0] ?? "todo";
}

export function matchesCourseFilter(level: CatalogLevel, filter: CourseFilter, now: string): boolean {
  switch (filter) {
    case "all": return true;
    case "todo": return !isCompletedStatus(level.status);
    case "done": return isCompletedStatus(level.status);
    case "review": return isReviewDue(level, now);
  }
}

export function nextUnfinishedTask(topics: LearningModule["topics"]) {
  const unfinished = topics.flatMap((topic) => topic.levels
    .filter((level) => !isCompletedStatus(level.status))
    .map((level) => ({ topic, level })));
  return unfinished.filter(({ level }) => level.attempts > 0)
    .sort((a, b) => (b.level.lastRunAt ?? "").localeCompare(a.level.lastRunAt ?? ""))[0]
    ?? unfinished[0] ?? null;
}

export function selectedCourseStage(track: CatalogTrack, stageId?: string | null) {
  const stages = learningModules(track);
  const target = nextUnfinishedTask(track.topics);
  return stages.find((stage) => stage.id === stageId)
    ?? stages.find((stage) => stage.topics.some((topic) => topic.id === target?.topic.id))
    ?? stages[0];
}

export function courseQuery(stageId: string, filter: CourseFilter): string {
  return new URLSearchParams({ stage: stageId, filter }).toString();
}

export function courseStagePercent(passed: number, total: number): number {
  return total === 0 ? 0 : Math.round((100 * passed) / total);
}

export function courseStageForTopic(track: CatalogTrack, topicId: string) {
  return learningModules(track).find((stage) => stage.topics.some((topic) => topic.id === topicId));
}
