export type RetryOptions = {
  maxAttempts: number;
  shouldRetry?: (error: unknown, attempt: number) => boolean;
};

export function withRetry<Args extends readonly unknown[], Result>(
  operation: (...args: Args) => Promise<Result>,
  options: RetryOptions,
): (...args: Args) => Promise<Result> {
  // TODO
  throw new Error("TODO");
}
