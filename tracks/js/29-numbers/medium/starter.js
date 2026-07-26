export function approxEqual(a, b, tolerance = 1e-9) {
  return Math.abs(a - b) < tolerance;
}

export function toFixedNumber(value, digits) {
  return Number(value.toFixed(digits));
}
