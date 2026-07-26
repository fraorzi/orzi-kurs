// TODO
export function pluck<T extends object, K>(
  items: readonly T[],
  key: K,
): unknown[] {
  return [];
}

// TODO
export function indexBy<T extends object, K>(
  items: readonly T[],
  key: K,
): Map<unknown, T> {
  return new Map();
}

// TODO
export function countBy<T, K>(
  items: readonly T[],
  keyOf: (item: T) => K,
): Map<K, number> {
  return new Map();
}

// TODO
export function sumBy<K extends PropertyKey, T>(
  items: readonly T[],
  key: K,
): number {
  return 0;
}
