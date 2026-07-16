import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  enrichOrderLines,
  type EnrichedLine,
  type OrderLine,
  type Product,
} from "./starter";

describe("enrichOrderLines — poprawność", () => {
  it("zachowuje kolejność i modeluje brak produktu przez null", () => {
    const products: readonly Product[] = [
      { id: "p1", name: "Book", price: 40 },
      { id: "p2", name: "Pen", price: 5 },
    ];
    const lines: readonly OrderLine[] = [
      { productId: "p2", quantity: 2 },
      { productId: "missing", quantity: 1 },
    ];
    const result = enrichOrderLines(lines, products);
    type _result = Expect<Equal<typeof result, EnrichedLine[]>>;
    expect(result).toEqual([
      {
        productId: "p2",
        quantity: 2,
        product: { id: "p2", name: "Pen", price: 5 },
      },
      { productId: "missing", quantity: 1, product: null },
    ]);
  });

  it("nie mutuje wejściowych tablic ani obiektów", () => {
    const products: readonly Product[] = [
      { id: "p1", name: "Book", price: 40 },
    ];
    const lines: readonly OrderLine[] = [{ productId: "p1", quantity: 1 }];
    enrichOrderLines(lines, products);
    expect(products).toEqual([{ id: "p1", name: "Book", price: 40 }]);
    expect(lines).toEqual([{ productId: "p1", quantity: 1 }]);
  });
});

describe("enrichOrderLines — złożoność", () => {
  it("[quality] odczytuje ID każdego produktu tylko przy budowie indeksu", () => {
    let idReads = 0;
    const products: Product[] = Array.from({ length: 100 }, (_, index) => ({
      get id() {
        idReads += 1;
        return `p${index}`;
      },
      name: `Product ${index}`,
      price: index,
    }));
    const lines: OrderLine[] = Array.from({ length: 100 }, (_, index) => ({
      productId: `p${99 - index}`,
      quantity: 1,
    }));
    enrichOrderLines(lines, products);
    expect(idReads).toBe(products.length);
  });
});
