export function processQueue(items, fn) {
  // Poprawne, ale O(n²): każdy shift() przesuwa całą resztę tablicy.
  const queue = [...items];
  const results = [];
  while (queue.length > 0) {
    results.push(fn(queue.shift()));
  }
  return results;
}
