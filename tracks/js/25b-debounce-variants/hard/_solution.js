export function throttle(fn, wait, options = {}) {
  const { leading = true, trailing = true } = options;
  let last = 0;
  let timer = null;
  let lastArgs = null;

  function trailingEdge() {
    last = leading ? Date.now() : 0;
    timer = null;
    fn(...lastArgs);
    lastArgs = null;
  }

  return (...args) => {
    const now = Date.now();
    if (last === 0 && !leading) last = now;
    const remaining = wait - (now - last);
    lastArgs = args;
    if (remaining <= 0 || remaining > wait) {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
      last = now;
      fn(...args);
    } else if (trailing && timer === null) {
      timer = setTimeout(trailingEdge, remaining);
    }
  };
}
