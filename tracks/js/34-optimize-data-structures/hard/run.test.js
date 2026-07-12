import { describe, it, expect } from "vitest";
import { expectScaling } from "@harness/bench";
import { groupSum } from "./starter.js";

describe("groupSum — poprawność", () => {
  it("sumuje kwoty w obrębie kategorii", () => {
    expect(
      groupSum([
        { category: "food", amount: 10 },
        { category: "toys", amount: 5 },
        { category: "food", amount: 3 },
      ]),
    ).toEqual({ food: 13, toys: 5 });
  });

  it("dla pustej listy zwraca pusty obiekt", () => {
    expect(groupSum([])).toEqual({});
  });

  it("radzi sobie z jedną kategorią", () => {
    expect(groupSum([{ category: "a", amount: 1 }, { category: "a", amount: 2 }])).toEqual({ a: 3 });
  });
});

describe("groupSum — złożoność", () => {
  it("działa w czasie liniowym, nie kwadratowym (nawet gdy kategorii przybywa)", () => {
    expectScaling({
      fn: (transactions) => groupSum(transactions),
      makeInput: (n) =>
        Array.from({ length: n }, (_, i) => ({
          category: `c${i % Math.floor(n / 10)}`,
          amount: i,
        })),
      sizes: [2000, 20000],
      expect: "linear",
    });
  });
});
