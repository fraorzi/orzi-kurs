import { describe, it, expect } from "vitest";
import { totalCost } from "./starter.js";

describe("totalCost — poprawność", () => {
  it("sumuje ilość razy cena dla każdego zamówienia", () => {
    const priceOf = (id) => (id === "a" ? 10 : 5);
    expect(
      totalCost(
        [
          { productId: "a", qty: 2 },
          { productId: "b", qty: 1 },
          { productId: "a", qty: 3 },
        ],
        priceOf,
      ),
    ).toBe(55);
  });

  it("dla pustej listy zwraca 0", () => {
    expect(totalCost([], () => 1)).toBe(0);
  });
});

describe("totalCost — memoizacja", () => {
  it("[quality] woła priceOf raz na RÓŻNY produkt, nie raz na zamówienie", () => {
    let calls = 0;
    const priceOf = (id) => {
      calls += 1;
      return id === "a" ? 10 : 5;
    };
    totalCost(
      [
        { productId: "a", qty: 1 },
        { productId: "a", qty: 2 },
        { productId: "b", qty: 1 },
        { productId: "a", qty: 4 },
      ],
      priceOf,
    );
    expect(
      calls,
      "są 2 różne produkty (a, b) — zapamiętuj wynik priceOf w Map, zamiast liczyć go dla każdego zamówienia",
    ).toBe(2);
  });

  it("wynik pozostaje poprawny mimo cache'owania", () => {
    const priceOf = (id) => ({ a: 10, b: 5 })[id];
    expect(totalCost([{ productId: "a", qty: 2 }, { productId: "a", qty: 1 }], priceOf)).toBe(30);
  });
});
