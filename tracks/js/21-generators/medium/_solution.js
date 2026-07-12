export function* flatten(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) {
      yield* flatten(item);
    } else {
      yield item;
    }
  }
}

export function* chain(...iterables) {
  for (const iterable of iterables) {
    yield* iterable;
  }
}
