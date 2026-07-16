export class Cart {
  #items = new Map<string, number>();

  static fromEntries(
    entries: readonly (readonly [string, number])[],
  ): Cart {
    const cart = new Cart();
    for (const [sku, quantity] of entries) {
      cart.add(sku, quantity);
    }
    return cart;
  }

  get size(): number {
    return this.#items.size;
  }

  get units(): number {
    let total = 0;
    for (const quantity of this.#items.values()) total += quantity;
    return total;
  }

  add(sku: string, quantity: number): Cart {
    if (quantity <= 0) {
      throw new RangeError("liczba sztuk musi być dodatnia");
    }
    this.#items.set(sku, (this.#items.get(sku) ?? 0) + quantity);
    return this;
  }

  remove = (sku: string): void => {
    this.#items.delete(sku);
  };

  toJSON(): Record<string, number> {
    return Object.fromEntries(this.#items);
  }
}
