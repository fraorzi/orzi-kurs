export async function promisePool(tasks, limit) {
  const results = [];
  let next = 0;
  let failed = false;

  async function worker() {
    while (next < tasks.length && !failed) {
      const i = next++;
      try {
        results[i] = await tasks[i]();
      } catch (err) {
        failed = true;
        throw err;
      }
    }
  }

  const workers = Array.from({ length: Math.min(limit, tasks.length) }, () => worker());
  await Promise.all(workers);
  return results;
}
