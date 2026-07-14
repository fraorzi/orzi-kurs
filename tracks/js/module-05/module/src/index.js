export { createPool } from "./pool.js";
export { withRetry } from "./retry.js";
export { createBatcher } from "./batch.js";

export function createScheduler(options = {}) {
  // TODO: sklej pool + retry w harmonogram zadań.
  // options: { concurrency = 4, retries = 2, backoffMs = 50 }.
  //  - utwórz createPool(concurrency)
  //  - run(task): przepuść przez pool zadanie owinięte w retry
  //    (pool.run(() => withRetry(task, { retries, backoffMs })))
  //  - runAll(tasks): Promise.all z run() dla każdego zadania
  //  - active / maxActive (gettery) delegujące do poolu
}
