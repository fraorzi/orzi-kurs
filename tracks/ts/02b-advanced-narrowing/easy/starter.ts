export function isPresent<T>(value: T): boolean {
  // TODO: zwróć predykat `value is NonNullable<T>`
  return Boolean(value);
}

export function compact<T>(
  values: readonly (T | null | undefined)[],
): T[] {
  // TODO: użyj isPresent bez rzutowania
  return [];
}

export function isString(value: unknown): boolean {
  // TODO: usuń jawną adnotację wyniku i pozwól TS wywnioskować predykat
  return false;
}
