import { describe, it, expect } from "vitest";
import { expectScaling } from "@harness/bench";
import { flatten } from "./starter.js";

describe("flatten — poprawność", () => {
  it("skleja tablicę tablic w jedną (jeden poziom)", () => {
    expect(flatten([[1, 2], [3], [4, 5]])).toEqual([1, 2, 3, 4, 5]);
  });

  it("radzi sobie z pustymi podtablicami i pustym wejściem", () => {
    expect(flatten([[], [1], []])).toEqual([1]);
    expect(flatten([])).toEqual([]);
  });

  it("nie mutuje podtablic wejściowych", () => {
    const input = [[1], [2]];
    flatten(input);
    expect(input).toEqual([[1], [2]]);
  });
});

describe("flatten — złożoność", () => {
  it("działa w czasie liniowym względem liczby elementów, nie kwadratowym", () => {
    expectScaling({
      fn: (arrays) => flatten(arrays),
      makeInput: (n) => Array.from({ length: n }, (_, i) => [i]),
      sizes: [2000, 20000],
      expect: "linear",
    });
  });
});
