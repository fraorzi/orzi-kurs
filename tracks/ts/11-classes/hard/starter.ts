export class Cart {
  // TODO
  items = new Map<string, number>();

  // TODO
  static fromEntries(entries: readonly (readonly [string, number])[]): Cart {
    return new Cart();
  }

  // TODO
  size = 0;

  // TODO
  units = 0;

  add(sku: string, quantity: number): Cart {
    // TODO
    return this;
  }

  // TODO
  remove(sku: string): void {
    // TODO
  }

  toJSON(): Record<string, number> {
    // TODO
    return {};
  }
}
