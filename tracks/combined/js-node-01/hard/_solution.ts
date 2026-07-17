export interface RetryError extends Error { transient?: boolean }
async function retry<T>(operation: () => Promise<T>): Promise<T> {
  for (let attempt = 1; ; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      if (attempt >= 3 || !(error as RetryError).transient) throw error;
    }
  }
}
export async function runCli<T, R>(items: readonly T[], limit: number, worker: (item: T) => Promise<R>): Promise<R[]> {
  if (!Number.isInteger(limit) || limit < 1) throw new Error("Nieprawidłowy limit");
  const output = new Array<R>(items.length);
  let cursor = 0;
  async function consume() {
    for (;;) {
      const index = cursor++;
      if (index >= items.length) return;
      output[index] = await retry(() => worker(items[index]));
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, consume));
  return output;
}
