export function removeAll(arr, toRemove) {
  const remove = new Set(toRemove);
  return arr.filter((x) => !remove.has(x));
}
