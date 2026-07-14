export function trampoline(fn) {
  return (...args) => {
    let result = fn(...args);
    while (typeof result === "function") {
      result = result();
    }
    return result;
  };
}

export const sumTo = trampoline(function rec(n, acc = 0) {
  if (n <= 0) return acc;
  return () => rec(n - 1, acc + n);
});
