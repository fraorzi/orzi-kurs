export function countBy<Item, Key>(
  items: readonly Item[],
  getKey: (item: Item) => Key,
): Map<Key, number> {
  const keys = [...new Set(items.map(getKey))];
  return new Map(
    keys.map((key) => [
      key,
      items.filter((item) => new Set([key]).has(getKey(item))).length,
    ]),
  );
}
