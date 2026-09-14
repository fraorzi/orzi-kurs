export type TaskFilter = "all" | "open" | "done";

export interface TeamTask {
  id: string;
  title: string;
  done: boolean;
}

export interface TaskState {
  tasks: TeamTask[];
  filter: TaskFilter;
}

export type TaskAction =
  | { type: "task_added"; task: TeamTask }
  | { type: "task_toggled"; id: string }
  | { type: "task_deleted"; id: string }
  | {
      type: "filter_changed";
      filter: TaskFilter;
    };
