export interface RetryOptions {
  maxAttempts: number;
  backoff: (attempt: number) => Promise<void>;
}

export async function solve(
  eventId: string,
  seen: Set<string>,
  handle: () => Promise<void>,
  options: RetryOptions,
): Promise<"processed" | "duplicate"> {
  if (seen.has(eventId)) return "duplicate";

  let lastError: unknown;
  for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
    try {
      await handle();
      seen.add(eventId);
      return "processed";
    } catch (error) {
      lastError = error;
      if (attempt < options.maxAttempts) await options.backoff(attempt);
    }
  }
  throw lastError;
}
