export function range(start, end) {
  return {
    [Symbol.iterator]() {
      let current = start;
      return {
        next() {
          return current <= end
            ? { value: current++, done: false }
            : { value: undefined, done: true };
        },
      };
    },
  };
}

export function toArray(iterable) {
  const out = [];
  for (const item of iterable) {
    out.push(item);
  }
  return out;
}
