export function min(a, b) {
  return a < b ? a : b;
}

export function pow(x, n) {
  let result = 1;
  for (let i = 0; i < n; i++) {
    result *= x;
  }
  return result;
}

export function greet(name, greeting = "Cześć") {
  return `${greeting}, ${name}!`;
}
