export function spy(fn) {
  wrapper.calls = [];
  function wrapper(...args) {
    wrapper.calls.push(args);
    return fn.apply(this, args);
  }
  return wrapper;
}

export function once(fn) {
  let called = false;
  let result;

  return function (...args) {
    if (called) return result;
    called = true;
    result = fn.apply(this, args);
    return result;
  };
}
