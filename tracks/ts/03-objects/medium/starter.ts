// TODO: słownik sku → sztuki, w całości tylko do odczytu.
export type Stock = Record<string, number>;

export function totalUnits(stock: Stock): number {
  // TODO
  return 0;
}

export function withUnits(stock: Stock, sku: string, delta: number): Stock {
  // TODO: nowy obiekt; wynik <= 0 usuwa klucz; oryginał nietknięty
  return stock;
}

export function lowStock(stock: Stock, threshold: number): string[] {
  // TODO: klucze poniżej progu, posortowane alfabetycznie
  return [];
}
