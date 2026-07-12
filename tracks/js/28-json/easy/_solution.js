export function stringifyFields(obj, fields) {
  return JSON.stringify(obj, fields, 2);
}

export function safeParse(str, fallback = null) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}
