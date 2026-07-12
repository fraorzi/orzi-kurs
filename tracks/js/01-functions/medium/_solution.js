export function sumAll(...nums) {
  return nums.reduce((total, n) => total + n, 0);
}

export function applyEach(fns, x) {
  return fns.map((fn) => fn(x));
}

export function compose2(f, g) {
  return (x) => f(g(x));
}
