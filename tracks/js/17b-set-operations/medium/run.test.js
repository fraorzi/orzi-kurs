import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { intersection, difference, isSubset } from "./starter.js";

const src = readFileSync(new URL("./starter.js", import.meta.url), "utf8");
const sorted = (set) => [...set].sort((x, y) => x - y);

describe("intersection", () => {
  it("zwraca część wspólną jako Set", () => {
    const r = intersection(new Set([1, 2, 3]), new Set([2, 3, 4]));
    expect(r).toBeInstanceOf(Set);
    expect(sorted(r)).toEqual([2, 3]);
  });

  it("nie mutuje argumentów", () => {
    const a = new Set([1, 2, 3]);
    const b = new Set([2, 3, 4]);
    intersection(a, b);
    expect([...a], "argument a nie może zostać zmieniony").toEqual([1, 2, 3]);
    expect([...b], "argument b nie może zostać zmieniony").toEqual([2, 3, 4]);
  });
});

describe("difference", () => {
  it("zwraca elementy a bez elementów b", () => {
    expect(sorted(difference(new Set([1, 2, 3]), new Set([2, 3, 4])))).toEqual([1]);
  });

  it("difference nie jest symetryczna", () => {
    expect(
      sorted(difference(new Set([2, 3, 4]), new Set([1, 2, 3]))),
      "difference(b, a) to {4}, a difference(a, b) to {1} — kierunek ma znaczenie",
    ).toEqual([4]);
  });
});

describe("isSubset", () => {
  it("true, gdy każdy element a jest w b", () => {
    expect(isSubset(new Set([1, 2]), new Set([1, 2, 3]))).toBe(true);
  });

  it("false, gdy choć jeden element a jest spoza b", () => {
    expect(isSubset(new Set([1, 9]), new Set([1, 2, 3]))).toBe(false);
  });

  it("pusty zbiór jest podzbiorem każdego", () => {
    expect(isSubset(new Set(), new Set([1]))).toBe(true);
  });
});

describe("implementacja", () => {
  it("nie używa wbudowanych metod algebry zbiorów", () => {
    expect(
      /\.(intersection|union|difference|symmetricDifference|isSubsetOf|isSupersetOf|isDisjointFrom)\s*\(/.test(
        src,
      ),
      "to zadanie ćwiczy ręczną implementację — użyj pętli i has(), bez wbudowanych metod Set",
    ).toBe(false);
  });
});
