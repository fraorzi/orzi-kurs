export function firstMatching(iterator, predicate, n) {
  return Iterator.from(iterator).filter(predicate).take(n).toArray();
}
