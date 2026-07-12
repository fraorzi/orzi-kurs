export function spy(fn) {
  function wrapper(...args) {
    wrapper.calls.push(args);
    return fn.apply(this, args);
  }
  wrapper.calls = [];
  return wrapper;
}

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
