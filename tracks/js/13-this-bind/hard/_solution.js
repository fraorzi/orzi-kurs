export function myBind(fn, ctx, ...preset) {
  return (...args) => fn.apply(ctx, [...preset, ...args]);
}

export function delay(fn, ms) {
  return function (...args) {
    setTimeout(() => fn.apply(this, args), ms);
  };
}
