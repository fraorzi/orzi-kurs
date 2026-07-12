export function getPath(obj, path, fallback) {
  let current = obj;
  for (const key of path.split(".")) {
    if (current === null || current === undefined) {
      return fallback;
    }
    current = current[key];
  }
  return current === undefined ? fallback : current;
}

export function mapValues(obj, fn) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, fn(value, key)]),
  );
}

export function groupBy(items, keyFn) {
  const result = {};
  for (const item of items) {
    const key = keyFn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }
  return result;
}
