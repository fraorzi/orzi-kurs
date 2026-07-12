export function normalizeUser({ name, age = 18, ...rest } = {}) {
  if (typeof name !== "string" || name.trim() === "") {
    throw new TypeError("name jest wymagane");
  }
  return { name: name.trim(), age: Number(age), meta: rest };
}

export function zip(...arrays) {
  if (arrays.length === 0) {
    return [];
  }
  const length = Math.min(...arrays.map((a) => a.length));
  return Array.from({ length }, (_, i) => arrays.map((a) => a[i]));
}

export function partition(arr, pred) {
  const pass = [];
  const fail = [];
  for (const item of arr) {
    if (pred(item)) {
      pass.push(item);
    } else {
      fail.push(item);
    }
  }
  return [pass, fail];
}
