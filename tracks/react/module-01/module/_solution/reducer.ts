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
  action: TaskAction,
): TaskState {
  switch (action.type) {
    case "task_added":
      return { ...state, tasks: [...state.tasks, action.task] };
    case "task_toggled":
      return {
        ...state,
        tasks: state.tasks.map((task) => (
          task.id === action.id ? { ...task, done: !task.done } : task
        )),
      };
    case "task_deleted":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
      };
    case "filter_changed":
      return { ...state, filter: action.filter };
  }
}
