export function withTimeout(promise, ms) {
  const timer = new Promise((_, reject) => {
    setTimeout(() => {
      const err = new Error(`Timeout after ${ms}ms`);
      err.name = "TimeoutError";
      reject(err);
    }, ms);
  });
  return Promise.race([promise, timer]);
}

export function firstSuccess(promises) {
  return new Promise((resolve, reject) => {
    let remaining = promises.length;
    const errors = new Array(promises.length);
    if (remaining === 0) {
      reject(new AggregateError([], "All promises were rejected"));
      return;
    }
    promises.forEach((p, i) => {
      Promise.resolve(p).then(resolve, (err) => {
        errors[i] = err;
        remaining--;
        if (remaining === 0) {
          reject(new AggregateError(errors, "All promises were rejected"));
        }
      });
    });
  });
}
