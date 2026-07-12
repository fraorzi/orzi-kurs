export function updateField(obj, key, value) {
  return { ...obj, [key]: value };
}

export function addItem(arr, item) {
  return [...arr, item];
}
