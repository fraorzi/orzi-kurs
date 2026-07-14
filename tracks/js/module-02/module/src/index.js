export { requestJson, HttpError } from "./http.js";
export { createQueue } from "./queue.js";

export function createApiClient(options = {}) {
  // TODO: sklej requestJson + createQueue w klienta API.
  // options: { fetchImpl = globalThis.fetch, concurrency = 4, retries = 2,
  //            backoffMs = 50, timeoutMs = 1000 }
  //  - utwórz kolejkę createQueue(concurrency)
  //  - get(url, overrides = {}): przepuść requestJson przez kolejkę
  //    (queue.add(() => requestJson(fetchImpl, url, { retries, backoffMs, timeoutMs, ...overrides })))
  //  - wystaw też pending i active (gettery delegujące do kolejki)
}
