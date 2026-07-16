import type {
  TaskAction,
  TaskState,
  TeamTask,
} from "./types";

export function createInitialState(
  initialTasks: readonly TeamTask[],
): TaskState {
  return { tasks: initialTasks, filter: "all" };
}

export function taskReducer(
  state: TaskState,
  _action: TaskAction,
): TaskState {
  return state;
}
