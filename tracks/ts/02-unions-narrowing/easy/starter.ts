export function formatValue(
  value: string | number | boolean,
): string {
  switch (typeof value) {
    case "boolean":
      if (value === true) {
        return "tak";
      }
      return "nie";
    case "number":
      return `${value.toFixed(2)}`;
    default:
      return value;
  }
}

export function charCount(
  value: string | string[],
): number {
  if (Array.isArray(value)) {
    return value.reduce(
      (sum, item) => sum + item.length,
      0,
    );
  }
  return value.length;
}

export function orDefault(
  value: string | null | undefined,
  fallback: string,
): string {
  return value ?? fallback;
}
