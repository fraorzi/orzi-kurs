export const JOB_STATES = ["queued", "running", "cancelled"] as const;
export type JobState = (typeof JOB_STATES)[number];

export type Job = {
  id: string;
  state: JobState;
};

export type JobResult<T> =
  | { ok: true; value: T }
  | { ok: false; message: string };
