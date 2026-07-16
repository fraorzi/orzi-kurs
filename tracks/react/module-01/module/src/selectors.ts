import type {
  TaskState,
  TeamTask,
} from "./types";

export function selectVisibleTasks(
  state: TaskState,
): readonly TeamTask[] {
  return state.tasks;
}

export function selectTaskCounts(
  _state: TaskState,
): { readonly open: number; readonly done: number } {
  return { open: 0, done: 0 };
}
