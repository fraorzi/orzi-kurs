export type WorkerConfig = {
  queue: string;
  concurrency: number;
  retry: boolean;
};

// TODO
export type Exact<Shape, Candidate extends Shape> = Candidate;

export function defineWorkerConfig<Candidate extends WorkerConfig>(
  config: Exact<WorkerConfig, Candidate>,
): Readonly<Candidate> {
  // TODO
  return config;
}
