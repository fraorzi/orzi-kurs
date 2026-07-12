import { describe, it, expect } from "vitest";
import { expectScaling } from "@harness/bench";
import { intersection, union, difference } from "./starter.js";

describe("intersection", () => {
  it("zwraca elementy obecne w obu tablicach, w kolejności z a", () => {
    expect(intersection([1, 2, 3, 4], [2, 4, 6])).toEqual([2, 4]);
  });

  it("wynik nie ma duplikatów", () => {
    expect(
      intersection([1, 1, 2, 2], [1, 2]),
      "część wspólna ma być zbiorem — deduplikuj wynik (np. Set 'seen')",
    ).toEqual([1, 2]);
  });

  it("działa w czasie liniowym, nie kwadratowym", () => {
    expectScaling({
      fn: ([a, b]) => intersection(a, b),
      makeInput: (n) => [
        Array.from({ length: n }, (_, i) => i),
        Array.from({ length: n }, (_, i) => i + Math.floor(n / 2)),
      ],
      sizes: [2000, 20000],
      expect: "linear",
    });
  });
});

describe("union", () => {
  it("łączy oba zbiory bez duplikatów, w kolejności pojawienia się", () => {
    expect(union([1, 2], [2, 3])).toEqual([1, 2, 3]);
    expect(union([], [1, 1])).toEqual([1]);
  });
});

describe("difference", () => {
  it("zwraca elementy z a, których nie ma w b", () => {
    expect(difference([1, 2, 3], [2])).toEqual([1, 3]);
  });

  it("wynik nie ma duplikatów i zachowuje kolejność a", () => {
    expect(
      difference([3, 3, 1, 2], [2]),
      "różnica ma być zbiorem w kolejności a — użyj Set(b) do sprawdzania i dedupu wyniku",
    ).toEqual([3, 1]);
  });
});
