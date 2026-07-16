import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { summarize, lineTotal, type CartLine, type CartSummary } from "./src/index";

// Asercja typu: CartSummary musi mieć dokładnie { total: number; items: number }.
type _cartSummaryShape = Expect<
  Equal<CartSummary, { total: number; items: number }>
>;

const lines: CartLine[] = [
  { sku: "a", price: 10, qty: 2 },
  { sku: "b", price: 5, qty: 1 },
];

describe("lineTotal", () => {
  it("mnoży cenę przez ilość", () => {
    expect(lineTotal({ sku: "a", price: 10, qty: 2 }), "10 × 2 = 20").toBe(20);
    expect(lineTotal({ sku: "z", price: 3, qty: 0 }), "3 × 0 = 0").toBe(0);
  });
});

describe("summarize", () => {
  it("sumuje wartość koszyka i liczbę sztuk", () => {
    const summary: CartSummary = summarize(lines);
    expect(summary, "10×2 + 5×1 = 25, sztuk 2+1 = 3").toEqual({
      total: 25,
      items: 3,
    });
  });

  it("zwraca zera dla pustego koszyka", () => {
    expect(summarize([]), "pusty koszyk → { total: 0, items: 0 }").toEqual({
      total: 0,
      items: 0,
    });
  });

  it("nie mutuje wejścia", () => {
    const input: CartLine[] = [{ sku: "a", price: 2, qty: 3 }];
    const copy = structuredClone(input);
    summarize(input);
    expect(input, "funkcja zmodyfikowała wejście").toEqual(copy);
  });
});
