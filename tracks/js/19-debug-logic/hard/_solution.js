export function firstDuplicate(arr) {
  const seen = new Set();
  for (const x of arr) {
    if (seen.has(x)) {
      return x;
    }
    seen.add(x);
  }
  return null;
}
