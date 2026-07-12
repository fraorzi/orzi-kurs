export function mergeAll(objects) {
  const result = {};
  for (const o of objects) {
    Object.assign(result, o);
  }
  return result;
}
