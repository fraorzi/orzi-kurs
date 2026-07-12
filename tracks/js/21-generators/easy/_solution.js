export function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

export function* take(iterable, n) {
  if (n <= 0) return;
  let count = 0;
  for (const item of iterable) {
    yield item;
    count += 1;
    if (count >= n) return;
  }
}
