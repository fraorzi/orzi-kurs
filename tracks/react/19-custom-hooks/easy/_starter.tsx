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
  value: string;
  delayMs: number;
}) {
  const debouncedValue = useDebouncedValue(value, delayMs);
  return (
    <output aria-label="Wartość">{debouncedValue}</output>
  );
}
