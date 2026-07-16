export async function mapConcurrent<Item, Result>(
  items: readonly Item[],
  limit: number,
  worker: (
    item: Item,
    index: number,
    signal: AbortSignal | undefined,
  ) => Promise<Result>,
  signal?: AbortSignal,
): Promise<Result[]> {
  if (!Number.isInteger(limit) || limit < 1) throw new RangeError("limit");
  signal?.throwIfAborted();

  const results = new Array<Result>(items.length);
  let nextIndex = 0;

  const run = async (): Promise<void> => {
    while (nextIndex < items.length) {
      signal?.throwIfAborted();
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await worker(items[index], index, signal);
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => run()),
  );
  return results;
}
