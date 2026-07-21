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

  seen.add(eventId);
  let succeeded = false;
  for (let attempt = 1; attempt <= options.maxAttempts && !succeeded; attempt++) {
    await handle().then(
      () => {
        succeeded = true;
      },
      () => undefined,
    );
  }
  return "processed";
}
