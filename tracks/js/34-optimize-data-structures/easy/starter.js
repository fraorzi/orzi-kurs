export function countInBoth(a, b) {
  // Poprawne, ale O(n·m): includes skanuje b dla każdej wartości z a.
  let count = 0;
  for (const value of new Set(a)) {
    if (b.includes(value)) {
      count += 1;
    }
  }
  return count;
}
