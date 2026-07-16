import { JOB_STATES, type Job, type JobResult } from "./contracts";

export async function runJob<T>(
  job: Job,
  execute: (job: Job) => Promise<T>,
): Promise<JobResult<T>> {
  if (job.state === JOB_STATES[2]) {
    return { ok: false, message: "job cancelled" };
  }

  try {
    return { ok: true, value: await execute(job) };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "unknown error",
    };
  }
}
