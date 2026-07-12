export function deepClone(value) {
  return structuredClone(value);
}

export function setIn(obj, path, value) {
  if (path.length === 0) {
    return value;
  }
  const [key, ...rest] = path;
  return { ...obj, [key]: setIn(obj[key], rest, value) };
}
