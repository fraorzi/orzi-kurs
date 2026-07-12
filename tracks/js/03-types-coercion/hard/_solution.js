function isNullish(value) {
  return value === null || value === undefined;
}

function toPrimitive(obj) {
  const value = obj.valueOf();
  if (typeof value !== "object" && typeof value !== "function") {
    return value;
  }
  return String(obj);
}

export function looseEq(a, b) {
  if (isNullish(a) || isNullish(b)) {
    return isNullish(a) && isNullish(b);
  }
  if (typeof a === typeof b) {
    return a === b;
  }
  if (typeof a === "boolean") {
    return looseEq(Number(a), b);
  }
  if (typeof b === "boolean") {
    return looseEq(a, Number(b));
  }
  if (typeof a === "object") {
    return looseEq(toPrimitive(a), b);
  }
  if (typeof b === "object") {
    return looseEq(a, toPrimitive(b));
  }
  if (typeof a === "number" && typeof b === "string") {
    return a === Number(b);
  }
  if (typeof a === "string" && typeof b === "number") {
    return Number(a) === b;
  }
  return false;
}
