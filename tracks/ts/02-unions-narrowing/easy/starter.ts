export function formatValue(value: string | number | boolean): string {
  // TODO: string → bez zmian, number → toFixed(2), boolean → "tak"/"nie"
  return value;
}

export function charCount(value: string | string[]): number {
  // TODO: długość stringa albo suma długości elementów tablicy
  return 0;
}

export function orDefault(
  value: string | null | undefined,
  fallback: string,
): string {
  // TODO: fallback tylko dla null/undefined — pusty string zostaje pustym stringiem
  return fallback;
}
