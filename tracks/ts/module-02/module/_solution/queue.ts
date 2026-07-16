export interface TaskQueue {
  add<T>(task: () => Promise<T>): Promise<T>;
  readonly active: number;
  readonly pending: number;
}

interface QueuedJob {
  run(): Promise<void>;
}

class TypedJob<T> implements QueuedJob {
  constructor(
    private readonly task: () => Promise<T>,
    private readonly resolve: (value: T | PromiseLike<T>) => void,
    private readonly reject: (reason?: unknown) => void,
  ) {}

  async run(): Promise<void> {
    try {
      this.resolve(await this.task());
    } catch (error) {
      this.reject(error);
    }
  }
}

class TaskQueueImpl implements TaskQueue {
  readonly #jobs: QueuedJob[] = [];
  #active = 0;

  constructor(private readonly concurrency: number) {
    if (!Number.isInteger(concurrency) || concurrency < 1) {
      throw new RangeError("concurrency musi być dodatnią liczbą całkowitą");
    }
  }

  add<T>(task: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.#jobs.push(new TypedJob(task, resolve, reject));
      this.#pump();
    });
  }

  get active(): number {
    return this.#active;
  }

  get pending(): number {
    return this.#jobs.length;
  }

  #pump(): void {
    while (this.#active < this.concurrency) {
      const job = this.#jobs.shift();
      if (!job) return;
      this.#start(job);
    }
  }

  #start(job: QueuedJob): void {
    this.#active += 1;
    job.run().finally(() => {
      this.#active -= 1;
      this.#pump();
    });
  }
}

export function createTaskQueue(concurrency = 4): TaskQueue {
  return new TaskQueueImpl(concurrency);
}
