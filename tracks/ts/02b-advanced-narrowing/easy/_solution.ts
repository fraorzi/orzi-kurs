export function isPresent<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export function compact<T>(
  values: readonly (T | null | undefined)[],
): T[] {
  return values.filter(isPresent);
}

export function isString(value: unknown) {
  return typeof value === "string";
}
