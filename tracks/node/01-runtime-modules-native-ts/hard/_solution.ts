export function solve(
  map: Record<string, string>,
  conditions: readonly string[],
): string {
  for (const condition of conditions) {
    if (map[condition]) return map[condition];
  }
  if (map.default) return map.default;
  throw new Error("Brak pasującego exportu i default");
}
