export class HttpError extends Error {
  constructor(status) {
    super(`HTTP ${status}`);
    this.name = "HttpError";
    this.status = status;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(fetchImpl, url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetchImpl(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export async function requestJson(fetchImpl, url, options = {}) {
  const { retries = 2, backoffMs = 50, timeoutMs = 1000 } = options;
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    if (attempt > 0) {
      await sleep(backoffMs * 2 ** (attempt - 1));
    }
    try {
      const res = await fetchWithTimeout(fetchImpl, url, timeoutMs);
      if (res.ok) return await res.json();
      if (res.status < 500) throw new HttpError(res.status);
      lastError = new HttpError(res.status);
    } catch (err) {
      if (err instanceof HttpError && err.status < 500) throw err;
      lastError = err;
    }
  }
  throw lastError;
}
