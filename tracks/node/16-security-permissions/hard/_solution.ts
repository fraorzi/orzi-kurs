export function solve(value: unknown, maxDepth = 3, maxItems = 5): unknown {
  const visit = (current: unknown, depth: number, key = ""): unknown => {
    if (/token|secret|password|authorization/i.test(key)) return "[REDACTED]";
    if (depth > maxDepth) return "[TRUNCATED]";
    if (Array.isArray(current))
      return [
        ...current.slice(0, maxItems).map((item) => visit(item, depth + 1)),
        ...(current.length > maxItems ? ["[TRUNCATED]"] : []),
      ];
    if (current && typeof current === "object")
      return Object.fromEntries(
        Object.entries(current).map(([childKey, item]) => [
          childKey,
          visit(item, depth + 1, childKey),
        ]),
      );
    return current;
  };
  return visit(value, 0);
}
