export type RetryOptions = {
  maxAttempts: number;
  shouldRetry?: (error: unknown, attempt: number) => boolean;
};

export function withRetry<Args extends readonly unknown[], Result>(
  operation: (...args: Args) => Promise<Result>,
  options: RetryOptions,
): (...args: Args) => Promise<Result> {
  // TODO: zachowaj Args i Result, wykonaj kontrolowaną pętlę prób
  throw new Error("TODO");
}
