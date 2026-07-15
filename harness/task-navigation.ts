import type { CatalogTrack } from "./catalog";

export interface TaskLink {
  taskId: string;
  href: string;
}

export function nextTaskInTrack(track: CatalogTrack, currentTaskId: string): TaskLink | null {
  const tasks = track.topics.flatMap((topic) =>
    topic.levels.map((level) => ({
      taskId: `${topic.id}/${level.id}`,
      href: `/track/${topic.id}/${level.id}`,
    })),
  );
  const currentIndex = tasks.findIndex((task) => task.taskId === currentTaskId);

  return currentIndex === -1 ? null : tasks[currentIndex + 1] ?? null;
}
