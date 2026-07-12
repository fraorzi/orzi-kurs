export function countInBoth(a, b) {
  const inB = new Set(b);
  let count = 0;
  for (const value of new Set(a)) {
    if (inB.has(value)) {
      count += 1;
    }
  }
  return count;
}
