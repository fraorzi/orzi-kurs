export async function runSequential(tasks) {
  const results = [];
  for (const task of tasks) {
    results.push(await task());
  }
  return results;
}

export async function runParallel(tasks) {
  return Promise.all(tasks.map((task) => task()));
}
