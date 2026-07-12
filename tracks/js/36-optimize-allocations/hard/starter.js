export function removeAll(arr, toRemove) {
  // Poprawne, ale O(k·n): dla każdej usuwanej wartości pełny filter (i nowa tablica).
  return toRemove.reduce((acc, value) => acc.filter((x) => x !== value), arr);
}
