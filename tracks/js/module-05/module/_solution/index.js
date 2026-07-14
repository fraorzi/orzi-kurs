import { createPool } from "./pool.js";
import { withRetry } from "./retry.js";
import { createBatcher } from "./batch.js";

export { createPool, withRetry, createBatcher };

export function createScheduler(options = {}) {
  const { concurrency = 4, retries = 2, backoffMs = 50 } = options;
  const pool = createPool(concurrency);
  const run = (task) => pool.run(() => withRetry(task, { retries, backoffMs }));

  return {
    run,
    runAll(tasks) {
      return Promise.all(tasks.map(run));
    },
    get active() {
      return pool.active;
    },
    get maxActive() {
      return pool.maxActive;
    },
  };
}
