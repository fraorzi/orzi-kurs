export function serialize(fn) {
  let queue = Promise.resolve();
  return function (...args) {
    const run = () => fn.apply(this, args);
    const result = queue.then(run, run);
    queue = result.catch(() => {});
    return result;
  };
}
