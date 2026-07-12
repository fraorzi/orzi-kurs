export function roundTo(value, decimals) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export function isInteger(value) {
  return Number.isInteger(value);
}
