export function createQueue(concurrency = 4) {
  let active = 0;
  const pending = [];

  function pump() {
    while (active < concurrency && pending.length > 0) {
      const job = pending.shift();
      active += 1;
      Promise.resolve()
        .then(job.task)
        .then(job.resolve, job.reject)
        .finally(() => {
          active -= 1;
          pump();
        });
    }
  }

  return {
    add(task) {
      return new Promise((resolve, reject) => {
        pending.push({ task, resolve, reject });
        pump();
      });
    },
    get active() {
      return active;
    },
    get pending() {
      return pending.length;
    },
  };
}
