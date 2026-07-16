export function pluck<T extends object, K extends keyof T>(
  items: readonly T[],
  key: K,
): T[K][] {
  return items.map((item) => item[key]);
}

export function indexBy<T extends object, K extends keyof T>(
  items: readonly T[],
  key: K,
): Map<T[K], T> {
  const index = new Map<T[K], T>();
  for (const item of items) {
    index.set(item[key], item);
  }
  return index;
}

export function countBy<T, K extends PropertyKey>(
  items: readonly T[],
  keyOf: (item: T) => K,
): Map<K, number> {
  const counts = new Map<K, number>();
  for (const item of items) {
    const key = keyOf(item);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

export function sumBy<K extends PropertyKey, T extends Record<K, number>>(
  items: readonly T[],
  key: K,
): number {
  return items.reduce((total, item) => total + item[key], 0);
}
