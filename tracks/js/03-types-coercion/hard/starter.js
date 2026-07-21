function toPrimitive(obj) {
  const newObj = obj.valueOf();
  return (typeof newObj === "object" ||
    typeof newObj === "function") &&
    newObj !== null
    ? String(obj)
    : newObj;
}

function isNullOrUndefined(value) {
  return value === null || value === undefined;
}

function isPairStringAndNumber(a, b) {
  return (
    (typeof a === "string" && typeof b === "number") ||
    (typeof a === "number" && typeof b === "string")
  );
}

export function looseEq(a, b) {
  if (typeof a === typeof b) return a === b;
  if (isNullOrUndefined(a) || isNullOrUndefined(b)) {
    return isNullOrUndefined(a) === isNullOrUndefined(b);
  }
  if (typeof a === "boolean") {
    return looseEq(Number(a), b);
  }
  if (typeof b === "boolean") {
    return looseEq(a, Number(b));
  }
  if (isPairStringAndNumber(a, b)) {
    return Number(a) === Number(b);
  }
  if (typeof a === "object") {
    return looseEq(toPrimitive(a), b);
  }
  if (typeof b === "object") {
    return looseEq(a, toPrimitive(b));
  }
  return false;
}
