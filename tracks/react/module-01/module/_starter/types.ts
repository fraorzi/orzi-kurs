export type TaskFilter = "all" | "open" | "done";

export interface TeamTask {
  readonly id: string;
  readonly title: string;
  readonly done: boolean;
}

export interface TaskState {
  readonly tasks: readonly TeamTask[];
  readonly filter: TaskFilter;
}

export type TaskAction =
  | { readonly type: "task_added"; readonly task: TeamTask }
  | { readonly type: "task_toggled"; readonly id: string }
  | { readonly type: "task_deleted"; readonly id: string }
  | {
      readonly type: "filter_changed";
      readonly filter: TaskFilter;
    };
