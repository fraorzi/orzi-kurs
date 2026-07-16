export class Cart {
  // TODO: prywatne pole runtime'owe (#items: Map<string, number>)
  items = new Map<string, number>();

  // TODO: fabryka statyczna
  static fromEntries(entries: readonly (readonly [string, number])[]): Cart {
    return new Cart();
  }

  // TODO: getter — liczba różnych pozycji
  size = 0;

  // TODO: getter — łączna liczba sztuk
  units = 0;

  add(sku: string, quantity: number): Cart {
    // TODO: quantity <= 0 → RangeError("liczba sztuk musi być dodatnia"); dolicza sztuki
    return this;
  }

  // TODO: metoda odporna na utratę this (pole z funkcją strzałkową)
  remove(sku: string): void {
    // TODO
  }

  toJSON(): Record<string, number> {
    // TODO: zwykły obiekt sku → sztuki
    return {};
  }
}
