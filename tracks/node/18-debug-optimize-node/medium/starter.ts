export async function solve<T, R>(
  items: readonly T[],
  limit: number,
  run: (item: T) => Promise<R>,
): Promise<R[]> {
  if (limit < 1) throw new Error("limit");
  return await Promise.all(items.map(run));
}
