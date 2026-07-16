export interface TaskQueue {
  add<T>(task: () => Promise<T>): Promise<T>;
  readonly active: number;
  readonly pending: number;
}

export function createTaskQueue(_concurrency = 4): TaskQueue {
  return {
    add: <T>(task: () => Promise<T>) => task(),
    active: 0,
    pending: 0,
  };
}
