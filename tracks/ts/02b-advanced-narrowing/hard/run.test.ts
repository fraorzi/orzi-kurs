import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { reduceCart, type CartState } from "./starter";

const initial: CartState = {
  quantities: { book: 1 },
  coupon: null,
};

describe("reduceCart", () => {
  it("dodaje i sumuje ilości bez mutowania stanu", () => {
    const next = reduceCart(initial, {
      type: "itemAdded",
      productId: "book",
      quantity: 2,
    });
    expect(next.quantities).toEqual({ book: 3 });
    expect(initial.quantities).toEqual({ book: 1 });
  });

  it("odrzuca niepoprawną ilość", () => {
    expect(() =>
      reduceCart(initial, {
        type: "itemAdded",
        productId: "book",
        quantity: 0,
      }),
    ).toThrow(RangeError);
  });

  it("usuwa produkt, a brak produktu jest no-op", () => {
    expect(
      reduceCart(initial, { type: "itemRemoved", productId: "book" }).quantities,
    ).toEqual({});
    expect(
      reduceCart(initial, { type: "itemRemoved", productId: "missing" }),
    ).toBe(initial);
  });

  it("normalizuje kupon i czyści koszyk", () => {
    expect(
      reduceCart(initial, { type: "couponApplied", code: "save10" }).coupon,
    ).toBe("SAVE10");
    expect(reduceCart(initial, { type: "cleared" })).toEqual({
      quantities: {},
      coupon: null,
    });
  });

  it("używa assertNever jako bramki wyczerpania", () => {
    const source = readFileSync(new URL("./starter.ts", import.meta.url), "utf8");
    expect(source).toMatch(/assertNever\s*\(\s*action\s*\)/);
  });
});
