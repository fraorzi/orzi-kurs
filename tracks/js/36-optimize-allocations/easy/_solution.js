export function flatten(arrays) {
  const out = [];
  for (const arr of arrays) {
    for (const item of arr) {
      out.push(item);
    }
  }
  return out;
}
