export function firstSuccess(promises) {
  return new Promise((resolve, reject) => {
    const errors = new Array(promises.length);
    let remaining = promises.length;
    if (remaining === 0) {
      reject(new AggregateError([], "wszystkie promisy odrzucone"));
      return;
    }
    promises.forEach((p, i) => {
      Promise.resolve(p).then(resolve, (err) => {
        errors[i] = err;
        remaining -= 1;
        if (remaining === 0) {
          reject(new AggregateError(errors, "wszystkie promisy odrzucone"));
        }
      });
    });
  });
}
