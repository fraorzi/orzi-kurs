export function keyBy<T, K extends PropertyKey>(
  items: readonly T[],
  keyOf: (item: T) => K,
): Map<K, T> {
  const result = new Map<K, T>();
  for (const item of items) result.set(keyOf(item), item);
  return result;
}
