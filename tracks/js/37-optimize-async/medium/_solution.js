export async function pooledMap(items, worker, limit) {
  const results = new Array(items.length);
  let next = 0;

  async function run() {
    while (next < items.length) {
      const i = next;
      next += 1;
      results[i] = await worker(items[i]);
    }
  }

  const runnerCount = Math.min(limit, items.length);
  const runners = Array.from({ length: runnerCount }, run);
  await Promise.all(runners);
  return results;
}
