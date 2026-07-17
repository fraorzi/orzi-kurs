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
  return (state, ...args) => {
    keyOf(state, ...args);
    return select(state, ...args);
  };
}
