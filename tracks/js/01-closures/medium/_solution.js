export function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

export function memoize(fn) {
  const cache = new Map();
  return function (arg) {
    if (!cache.has(arg)) {
      cache.set(arg, fn.call(this, arg));
    }
    return cache.get(arg);
  };
}
