export function sameValue(a, b) {
  if (a === b) {
    return a !== 0 || 1 / a === 1 / b;
  }
  return a !== a && b !== b;
}

export function defaultTo(value, fallback) {
  if (
    value === undefined ||
    value === null ||
    Number.isNaN(value)
  ) {
    return fallback;
  }
  return value;
}
