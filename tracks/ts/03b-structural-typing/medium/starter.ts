export type WorkerConfig = {
  queue: string;
  concurrency: number;
  retry: boolean;
};

// TODO: dodatkowe klucze Candidate mają otrzymać typ never.
export type Exact<Shape, Candidate extends Shape> = Candidate;

export function defineWorkerConfig<Candidate extends WorkerConfig>(
  config: Exact<WorkerConfig, Candidate>,
): Readonly<Candidate> {
  // TODO: zwróć zamrożoną kopię i zachowaj dokładny typ Candidate
  return config;
}
