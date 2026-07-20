export function spy(fn) {
  wrapper.calls = [];
  function wrapper(...args) {
    const temp = [];
    temp.push(...args);
    wrapper.calls.push(temp);

    return fn.apply(this, args);
  }
  return wrapper;
}

export function once(fn) {
  let called = false;
  let result;

  function wrapper(...args) {
    if (called) return result;
    called = true;
    result = fn.apply(this, args);
    return result;
  }

  return wrapper;
}
