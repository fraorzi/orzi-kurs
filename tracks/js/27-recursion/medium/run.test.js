import { describe, it, expect } from "vitest";
import { sumNested, treeSum } from "./starter.js";

describe("sumNested", () => {
  it("zwraca liczbę, gdy value nie jest tablicą (przypadek bazowy)", () => {
    expect(sumNested(5)).toBe(5);
  });

  it("sumuje płaską tablicę", () => {
    expect(sumNested([1, 2, 3])).toBe(6);
  });

  it("sumuje dowolnie zagnieżdżone tablice", () => {
    expect(
      sumNested([1, [2, [3, 4]], 5]),
      "dla elementu-tablicy zejdź rekurencyjnie, dla liczby dodaj ją",
    ).toBe(15);
  });

  it("pusta tablica daje 0", () => {
    expect(sumNested([])).toBe(0);
    expect(sumNested([[], [[]]])).toBe(0);
  });
});

describe("treeSum", () => {
  it("liść (pusty children) zwraca swoje value", () => {
    expect(treeSum({ value: 7, children: [] })).toBe(7);
  });

  it("sumuje value w całym drzewie", () => {
    const tree = {
      value: 1,
      children: [
        { value: 2, children: [{ value: 4, children: [] }] },
        { value: 3 },
      ],
    };
    expect(treeSum(tree), "suma = 1 + 2 + 4 + 3").toBe(10);
  });

  it("radzi sobie z pominiętym children", () => {
    expect(
      treeSum({ value: 5 }),
      "gdy children jest undefined, potraktuj je jak pustą listę (children ?? [])",
    ).toBe(5);
  });
});
