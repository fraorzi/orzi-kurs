export function multiplyNumeric(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      typeof value === "number" ? value * 2 : value,
    ]),
  );
}

export function pick(obj, keys) {
  return Object.fromEntries(
    keys.filter((key) => key in obj).map((key) => [key, obj[key]]),
  );
}

export function invert(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [value, key]),
  );
}
