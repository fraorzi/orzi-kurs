export function countBy<Item, Key>(
  items: readonly Item[],
  getKey: (item: Item) => Key,
): Map<Key, number> {
  const counts = new Map<Key, number>();
  for (const item of items) {
    const key = getKey(item);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}
