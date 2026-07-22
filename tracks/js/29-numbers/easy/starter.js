export function roundTo(value, decimals) {
  return (
    Math.round(value * 10 ** decimals) / 10 ** decimals
  );
}

export function isInteger(value) {
  return Number.isInteger(value);
}
