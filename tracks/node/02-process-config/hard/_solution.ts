export function solve(
  env: Record<string, string | undefined>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(env)
      .filter((entry): entry is [string, string] => entry[1] !== undefined)
      .map(([key, value]) => [
        key,
        /token|secret|password|key/i.test(key) ? "[REDACTED]" : value,
      ]),
  );
}
