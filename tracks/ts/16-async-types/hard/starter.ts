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
  // TODO: pool, kolejność wyniku i AbortSignal
  return [];
}
