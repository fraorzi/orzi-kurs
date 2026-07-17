export function useDebouncedValue<T>(
  value: T,
  _delayMs: number,
): T {
  return value;
}

export function DebouncedLabel({
  value,
  delayMs,
}: {
  readonly value: string;
  readonly delayMs: number;
}) {
  const debouncedValue = useDebouncedValue(value, delayMs);
  return <output aria-label="Wartość">{debouncedValue}</output>;
}
