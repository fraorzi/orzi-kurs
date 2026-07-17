export function createCachedSelector<
  State,
  Args extends readonly unknown[],
  Key,
  Result,
>(
  select: (state: State, ...args: Args) => Result,
  keyOf: (state: State, ...args: Args) => Key,
  maxEntries: number,
): (state: State, ...args: Args) => Result {
  if (!Number.isInteger(maxEntries) || maxEntries < 1) {
    throw new RangeError("maxEntries");
  }

  const cache = new Map<Key, { value: Result }>();
  return (state, ...args) => {
    const key = keyOf(state, ...args);
    const cached = cache.get(key);
    if (cached !== undefined) {
      cache.delete(key);
      cache.set(key, cached);
      return cached.value;
    }

    const entry = { value: select(state, ...args) };
    cache.set(key, entry);
    if (cache.size > maxEntries) {
      const oldest = cache.keys().next();
      if (!oldest.done) cache.delete(oldest.value);
    }
    return entry.value;
  };
}
