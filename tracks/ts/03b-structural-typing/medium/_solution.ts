export type WorkerConfig = {
  queue: string;
  concurrency: number;
  retry: boolean;
};

export type Exact<Shape, Candidate extends Shape> = Candidate &
  Record<Exclude<keyof Candidate, keyof Shape>, never>;

export function defineWorkerConfig<Candidate extends WorkerConfig>(
  config: Exact<WorkerConfig, Candidate>,
): Readonly<Candidate> {
  return Object.freeze({ ...config });
}
