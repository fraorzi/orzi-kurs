export function debounce(fn, waitMs) {
  let timer = null;

  return function debounced(...args) {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, waitMs);
  };
}
