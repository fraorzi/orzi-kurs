export function createWithDefaults(defaults, own) {
  return Object.assign(Object.create(defaults), own);
}

export function readSource(obj, key) {
  if (Object.hasOwn(obj, key)) {
    return "own";
  }
  return key in obj ? "inherited" : "missing";
}
