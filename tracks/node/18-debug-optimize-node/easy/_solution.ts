export function solve<
  T extends {
    id: string;
  },
>(items: readonly T[], inspect: (count: number) => void): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const item of items) {
    inspect(1);
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    out.push(item);
  }
  return out;
}
