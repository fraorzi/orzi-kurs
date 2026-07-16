export type Stock = Readonly<Record<string, number>>;

export function totalUnits(stock: Stock): number {
  return Object.values(stock).reduce((sum, units) => sum + units, 0);
}

export function withUnits(stock: Stock, sku: string, delta: number): Stock {
  const next: Record<string, number> = { ...stock };
  const units = (next[sku] ?? 0) + delta;
  if (units > 0) {
    next[sku] = units;
  } else {
    delete next[sku];
  }
  return next;
}

export function lowStock(stock: Stock, threshold: number): string[] {
  return Object.entries(stock)
    .filter(([, units]) => units < threshold)
    .map(([sku]) => sku)
    .sort((a, b) => a.localeCompare(b));
}
