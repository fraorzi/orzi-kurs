import type {
  TaskState,
  TeamTask,
} from "./types";

export function selectVisibleTasks(
  state: TaskState,
): readonly TeamTask[] {
  if (state.filter === "open") {
    return state.tasks.filter((task) => !task.done);
  }
  if (state.filter === "done") {
    return state.tasks.filter((task) => task.done);
  }
  return state.tasks;
}

export function selectTaskCounts(
  state: TaskState,
): { readonly open: number; readonly done: number } {
  let open = 0;
  let done = 0;
  for (const task of state.tasks) {
    if (task.done) {
      done += 1;
    } else {
      open += 1;
    }
  }
  return { open, done };
}
