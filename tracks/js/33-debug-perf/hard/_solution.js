export function processQueue(items, fn) {
  const results = [];
  for (let i = 0; i < items.length; i++) {
    results.push(fn(items[i]));
  }
  return results;
}
