export async function pooledMap(items, worker, limit) {
  // Poprawne, ale sekwencyjne: przetwarza po jednym (maxActive = 1), ignorując limit.
  const results = [];
  for (let i = 0; i < items.length; i++) {
    results[i] = await worker(items[i]);
  }
  return results;
}
