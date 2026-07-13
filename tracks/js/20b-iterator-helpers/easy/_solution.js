export function firstN(iterable, n) {
  return Iterator.from(iterable).take(n).toArray();
}

export function firstEvens(iterable, n) {
  return Iterator.from(iterable)
    .filter((x) => x % 2 === 0)
    .take(n)
    .toArray();
}
