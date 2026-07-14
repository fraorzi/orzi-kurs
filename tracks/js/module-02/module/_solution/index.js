import { requestJson, HttpError } from "./http.js";
import { createQueue } from "./queue.js";

export { requestJson, HttpError, createQueue };

export function createApiClient(options = {}) {
  const {
    fetchImpl = globalThis.fetch,
    concurrency = 4,
    retries = 2,
    backoffMs = 50,
    timeoutMs = 1000,
  } = options;
  const queue = createQueue(concurrency);

  return {
    get(url, overrides = {}) {
      return queue.add(() =>
        requestJson(fetchImpl, url, { retries, backoffMs, timeoutMs, ...overrides }),
      );
    },
    get pending() {
      return queue.pending;
    },
    get active() {
      return queue.active;
    },
  };
}
