export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function promisify(f) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      f(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };
}
