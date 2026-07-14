export function createBatcher(batchFn, options = {}) {
  const { maxSize = Infinity } = options;
  let queue = [];

  function flush() {
    if (queue.length === 0) return Promise.resolve();
    const batch = queue;
    queue = [];
    const keys = batch.map((item) => item.key);
    return Promise.resolve(batchFn(keys)).then(
      (results) => {
        batch.forEach((item, i) => item.resolve(results[i]));
      },
      (err) => {
        batch.forEach((item) => item.reject(err));
      },
    );
  }

  return {
    load(key) {
      return new Promise((resolve, reject) => {
        queue.push({ key, resolve, reject });
        if (queue.length >= maxSize) flush();
      });
    },
    flush,
    get size() {
      return queue.length;
    },
  };
}
