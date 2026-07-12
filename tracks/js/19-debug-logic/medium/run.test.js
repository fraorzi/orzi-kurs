import { describe, it, expect } from "vitest";
import { makeGetters, removeNegatives } from "./starter.js";

describe("makeGetters", () => {
  it("każdy getter zwraca swój indeks, nie wspólną wartość końcową", () => {
    const g = makeGetters(3);
    expect(
      [g[0](), g[1](), g[2]()],
      "wszystkie funkcje domykają tę samą i (żyjącą poza pętlą) — po pętli i === n; " +
        "użyj for(let i...) albo lokalnej kopii, by każda iteracja miała własne wiązanie",
    ).toEqual([0, 1, 2]);
  });

  it("działa dla n = 1", () => {
    expect(makeGetters(1)[0]()).toBe(0);
  });
});

describe("removeNegatives", () => {
  it("usuwa wszystkie liczby ujemne, także sąsiadujące", () => {
    expect(
      removeNegatives([1, -2, -3, 4]),
      "splice w pętli rosnącej przesuwa elementy pod już minięty indeks — sąsiednie ujemne są pomijane",
    ).toEqual([1, 4]);
  });

  it("dla samych ujemnych zwraca pustą tablicę", () => {
    expect(removeNegatives([-1, -2, -3])).toEqual([]);
  });

  it("zostawia nieujemne w kolejności (0 nie jest ujemne)", () => {
    expect(removeNegatives([0, -1, 5])).toEqual([0, 5]);
  });
});
