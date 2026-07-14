export function debounce(fn, wait, options = {}) {
  const { leading = false, trailing = true } = options;
  let timer = null;
  let lastArgs = null;
  let calls = 0;
  let leadingDone = false;

  function onTimer() {
    if (trailing && calls > (leadingDone ? 1 : 0)) {
      fn(...lastArgs);
    }
    timer = null;
    calls = 0;
    leadingDone = false;
    lastArgs = null;
  }

  return (...args) => {
    lastArgs = args;
    calls += 1;
    const starting = timer === null;
    if (starting && leading) {
      fn(...args);
      leadingDone = true;
    }
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(onTimer, wait);
  };
}
