// TODO: Job i JobResult są typami — verbatimModuleSyntax wymaga import type.
import { JOB_STATES, Job, JobResult } from "./contracts";

export async function runJob<T>(
  job: Job,
  execute: (job: Job) => Promise<T>,
): Promise<JobResult<T>> {
  // TODO: cancelled bez execute; catch ma unknown
  return { ok: false, message: JOB_STATES.join(",") };
}
