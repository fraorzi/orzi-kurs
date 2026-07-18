export function isRetryable(error: unknown): boolean {
  return error instanceof Error;
}

export async function runWithRetry<T>(
  maxAttempts: number,
  operation: (attempt: number) => Promise<T>,
  onRetry?: (attempt: number, error: unknown) => void,
): Promise<T> {
  void maxAttempts;
  void onRetry;
  return operation(1);
}
