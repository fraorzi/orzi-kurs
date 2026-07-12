export function firstUnique(arr) {
  const counts = new Map();
  for (const x of arr) {
    counts.set(x, (counts.get(x) ?? 0) + 1);
  }
  for (const x of arr) {
    if (counts.get(x) === 1) {
      return x;
    }
  }
  return undefined;
}
