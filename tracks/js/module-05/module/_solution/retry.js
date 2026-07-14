function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function withRetry(task, options = {}) {
  const { retries = 2, backoffMs = 50 } = options;
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    if (attempt > 0) {
      await sleep(backoffMs * 2 ** (attempt - 1));
    }
    try {
      return await task();
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}
