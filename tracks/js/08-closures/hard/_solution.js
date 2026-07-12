export function makeArmy() {
  const shooters = [];
  for (let i = 0; i < 10; i++) {
    shooters.push(function () {
      return i;
    });
  }
  return shooters;
}

export function spy(fn) {
  function wrapper(...args) {
    const result = fn.apply(this, args);
    wrapper.calls.push({ args, result });
    return result;
  }
  wrapper.calls = [];
  return wrapper;
}
