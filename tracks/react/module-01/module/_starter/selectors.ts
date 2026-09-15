import type { TaskState, TeamTask } from "./types";

export function selectVisibleTasks(
  state: TaskState,
): TeamTask[] {
  return state.tasks;
}

export function selectTaskCounts(_state: TaskState): {
  open: number;
  done: number;
} {
  return { open: 0, done: 0 };
}
