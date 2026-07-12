export function naturals() {
  return {
    [Symbol.iterator]() {
      let n = 0;
      return {
        next() {
          n += 1;
          return { value: n, done: false };
        },
      };
    },
  };
}

export function take(iterable, n) {
  const iterator = iterable[Symbol.iterator]();
  const out = [];
  while (out.length < n) {
    const { value, done } = iterator.next();
    if (done) break;
    out.push(value);
  }
  return out;
}
