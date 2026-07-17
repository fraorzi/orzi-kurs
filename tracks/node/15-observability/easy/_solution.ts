export function solve(
  input: {
    level: string;
    message: string;
    requestId?: string;
    fields?: Record<string, unknown>;
  },
  now: () => string,
): string {
  const fields = Object.fromEntries(
    Object.entries(input.fields ?? {})
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [
        key,
        /token|secret|password/i.test(key) ? "[REDACTED]" : value,
      ]),
  );
  return (
    JSON.stringify({
      timestamp: now(),
      level: input.level,
      message: input.message,
      ...(input.requestId ? { requestId: input.requestId } : {}),
      ...fields,
    }) + "\n"
  );
}
