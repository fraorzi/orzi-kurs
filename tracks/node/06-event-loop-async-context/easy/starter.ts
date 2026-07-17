export async function solve<T, R>(
  items: readonly T[],
  batchSize: number,
  map: (item: T) => R,
): Promise<R[]> {
  throw new Error("TODO");
}
