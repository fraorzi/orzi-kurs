export function multiplyNumeric(obj) {
  const result = {};
  for (const key in obj) {
    if (typeof obj[key] === "number") {
      result[key] = obj[key] * 2;
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}

export function pick(obj, keys) {
  const result = {};
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

export function invert(obj) {
  const result = {};
  for (const key in obj) {
    result[obj[key]] = key;
  }
  return result;
}
