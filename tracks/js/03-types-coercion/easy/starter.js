export function compact(arr) {
  return arr.filter(Boolean);
}

export function typeOf(value) {
  return value === null ? "null" : typeof value;
}

export function isNumericString(s) {
  if (typeof s !== "string" || s.trim().length === 0) {
    return false;
  }
  return Number.isFinite(Number(s));
}
