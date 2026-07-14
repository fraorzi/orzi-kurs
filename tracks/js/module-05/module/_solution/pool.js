export function createPool(concurrency = 4) {
  let active = 0;
  let maxActive = 0;
  const waiting = [];

  function pump() {
    while (active < concurrency && waiting.length > 0) {
      const job = waiting.shift();
      active += 1;
      maxActive = Math.max(maxActive, active);
      Promise.resolve()
        .then(job.task)
        .then(job.resolve, job.reject)
        .finally(() => {
          active -= 1;
          pump();
        });
    }
  }

  function run(task) {
    return new Promise((resolve, reject) => {
      waiting.push({ task, resolve, reject });
      pump();
    });
  }

  return {
    run,
    runAll(tasks) {
      return Promise.all(tasks.map((task) => run(task)));
    },
    get active() {
      return active;
    },
    get maxActive() {
      return maxActive;
    },
  };
}
