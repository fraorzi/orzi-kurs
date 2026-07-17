export type RetryOptions = {
  maxAttempts: number;
  shouldRetry?: (error: unknown, attempt: number) => boolean;
};

export function withRetry<Args extends readonly unknown[], Result>(
  operation: (...args: Args) => Promise<Result>,
  options: RetryOptions,
): (...args: Args) => Promise<Result> {
  if (!Number.isInteger(options.maxAttempts) || options.maxAttempts < 1) {
    throw new RangeError("maxAttempts");
  }

  return async (...args: Args): Promise<Result> => {
    for (let attempt = 1; ; attempt++) {
      try {
        return await operation(...args);
      } catch (error) {
        if (
          attempt >= options.maxAttempts ||
          options.shouldRetry?.(error, attempt) === false
        ) {
          throw error;
        }
      }
    }
  };
}
