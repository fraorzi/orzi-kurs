export function debounce(fn, wait) {
  let timer = null;
  let lastArgs = null;
  let result;

  function invoke() {
    result = fn(...lastArgs);
    lastArgs = null;
  }

  const debounced = (...args) => {
    lastArgs = args;
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      invoke();
    }, wait);
  };

  debounced.cancel = () => {
    if (timer !== null) clearTimeout(timer);
    timer = null;
    lastArgs = null;
  };

  debounced.flush = () => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
      invoke();
    }
    return result;
  };

  return debounced;
}
