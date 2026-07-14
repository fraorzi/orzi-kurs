import type { CatalogTrack } from "./catalog";
import type { Progress } from "./types";
import { isReviewDue } from "./mastery";

export type RecommendationReason = "retry-failed" | "retry-without-hint" | "review-due" | "next-new";

export interface TaskRecommendation {
  taskId: string;
  href: string;
  reason: RecommendationReason;
  label: string;
}

export function recommendTask(
  track: CatalogTrack,
  progress: Progress,
  currentTaskId?: string,
  now = new Date(),
): TaskRecommendation | null {
  const tasks = track.topics.flatMap((topic) =>
    topic.levels.map((level) => ({
      taskId: `${topic.id}/${level.id}`,
      href: `/track/${topic.id}/${level.id}`,
    })),
  );
  const currentIndex = currentTaskId
    ? tasks.findIndex((task) => task.taskId === currentTaskId)
    : -1;
  const ordered = currentIndex === -1
    ? tasks
    : [...tasks.slice(currentIndex + 1), ...tasks.slice(0, currentIndex)];

  const candidates = ordered
    .filter((task) => task.taskId !== currentTaskId)
    .map((task, order) => {
      const taskProgress = progress[task.taskId];
      if (taskProgress?.status === "failed" || taskProgress?.lastAttemptPassed === false) {
        return { ...task, order, priority: 0, reason: "retry-failed" as const, label: "Wróć do błędu" };
      }
      if (taskProgress?.status === "passed-with-hint") {
        return { ...task, order, priority: 1, reason: "retry-without-hint" as const, label: "Powtórz bez hinta" };
      }
      if (taskProgress?.status === "passed" && isReviewDue(taskProgress, now)) {
        return { ...task, order, priority: 2, reason: "review-due" as const, label: "Powtórka na dziś" };
      }
      if (!taskProgress || taskProgress.status === "not-started") {
        return { ...task, order, priority: 3, reason: "next-new" as const, label: "Nowe zadanie" };
      }
      return null;
    })
    .filter((task) => task !== null)
    .sort((a, b) => a.priority - b.priority || a.order - b.order);

  return candidates[0] ?? null;
}
