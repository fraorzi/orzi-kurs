export function solve<
  T extends {
    id: string;
  },
>(items: readonly T[], inspect: (count: number) => void): T[] {
  const out: T[] = [];
  for (const item of items) {
    inspect(out.length);
    if (!out.some((known) => known.id === item.id)) out.push(item);
  }
  return out;
}
