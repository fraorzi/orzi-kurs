import {
  useEffect,
  useState,
} from "react";

export function useDebouncedValue<T>(
  value: T,
  delayMs: number,
): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => clearTimeout(timeoutId);
  }, [delayMs, value]);

  return debouncedValue;
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
