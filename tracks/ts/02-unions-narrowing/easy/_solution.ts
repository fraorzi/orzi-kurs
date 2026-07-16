export function formatValue(value: string | number | boolean): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return value.toFixed(2);
  return value ? "tak" : "nie";
}

export function charCount(value: string | string[]): number {
  if (Array.isArray(value)) {
    return value.reduce((sum, item) => sum + item.length, 0);
  }
  return value.length;
}

export function orDefault(
  value: string | null | undefined,
  fallback: string,
): string {
  return value ?? fallback;
}
