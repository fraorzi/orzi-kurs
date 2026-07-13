export function firstTransformed(items, transform, keep, k) {
  return Iterator.from(items)
    .map(transform)
    .filter(keep)
    .take(k)
    .toArray();
}
