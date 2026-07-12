export function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

export function pow(base, exp) {
  if (exp === 0) return 1;
  return base * pow(base, exp - 1);
}
