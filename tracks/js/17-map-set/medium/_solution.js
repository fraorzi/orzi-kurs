export function aclean(arr) {
  const groups = new Map();
  for (const word of arr) {
    const key = word.toLowerCase().split("").sort().join("");
    groups.set(key, word);
  }
  return [...groups.values()];
}

export function objectToMap(obj) {
  return new Map(Object.entries(obj));
}

export function mapToObject(map) {
  return Object.fromEntries(map);
}
