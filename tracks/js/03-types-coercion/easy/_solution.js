export function compact(arr) {
  return arr.filter(Boolean);
}

export function typeOf(value) {
  if (value === null) {
    return "null";
  }
  return typeof value;
}

export function isNumericString(s) {
  if (typeof s !== "string" || s.trim() === "") {
    return false;
  }
  return Number.isFinite(Number(s));
}
