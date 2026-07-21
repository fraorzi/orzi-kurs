export function isRetryable(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "errno" in error &&
    (error.errno === 1213 || error.errno === 1205)
  );
}

export async function runWithRetry<T>(
  maxAttempts: number,
  operation: (attempt: number) => Promise<T>,
  onRetry?: (attempt: number, error: unknown) => void,
): Promise<T> {
  for (let attempt = 1; ; attempt += 1) {
    try {
      return await operation(attempt);
    } catch (error) {
      if (!isRetryable(error) || attempt >= maxAttempts) throw error;
      onRetry?.(attempt, error);
    }
  }
}
