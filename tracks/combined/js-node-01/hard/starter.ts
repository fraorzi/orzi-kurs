export interface RetryError extends Error {
  transient?: boolean;
}

export async function runCli<T, R>(
  items: readonly T[],
  _limit: number,
  worker: (item: T) => Promise<R>,
): Promise<R[]> {
  return Promise.all(items.map(worker));
}
