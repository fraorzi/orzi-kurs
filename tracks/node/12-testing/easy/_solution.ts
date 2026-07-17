export function solve<T>(
  ttlMs: number,
  load: () => T,
  now: () => number,
): () => T {
  let cached:
    | {
        value: T;
        expiresAt: number;
      }
    | undefined;
  return () => {
    const time = now();
    if (!cached || time >= cached.expiresAt)
      cached = { value: load(), expiresAt: time + ttlMs };
    return cached.value;
  };
}
