export function myInstanceOf(value, Ctor) {
  if (value === null || (typeof value !== "object" && typeof value !== "function")) {
    return false;
  }
  let proto = Object.getPrototypeOf(value);
  while (proto !== null) {
    if (proto === Ctor.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

export function getDefiningObject(obj, key) {
  let current = obj;
  while (current !== null) {
    if (Object.hasOwn(current, key)) {
      return current;
    }
    current = Object.getPrototypeOf(current);
  }
  return null;
}

export function listProps(obj) {
  const own = Object.keys(obj).sort();
  const inherited = [];
  for (const key in obj) {
    if (!Object.hasOwn(obj, key)) {
      inherited.push(key);
    }
  }
  inherited.sort();
  return { own, inherited };
}
