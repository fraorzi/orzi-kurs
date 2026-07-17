export async function solve<T, R>(
  items: readonly T[],
  batchSize: number,
  map: (item: T) => R,
): Promise<R[]> {
  if (batchSize < 1) throw new Error("batchSize musi być dodatni");
  const { setImmediate } = await import("node:timers/promises");
  const out: R[] = [];
  for (let index = 0; index < items.length; index += batchSize) {
    out.push(...items.slice(index, index + batchSize).map(map));
    await setImmediate();
  }
  return out;
}
