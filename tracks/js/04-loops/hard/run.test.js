import { describe, it, expect } from "vitest";
import { expectScaling } from "@harness/bench";
import { sieve, collatzLength } from "./starter.js";

describe("sieve", () => {
  it("zwraca liczby pierwsze do n włącznie", () => {
    expect(sieve(10)).toEqual([2, 3, 5, 7]);
    expect(sieve(30)).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
  });

  it("przypadki brzegowe", () => {
    expect(sieve(1), "dla n < 2 nie ma liczb pierwszych").toEqual([]);
    expect(sieve(2)).toEqual([2]);
  });

  it("znajduje poprawną liczbę pierwszych dla większego n", () => {
    expect(sieve(10000), "do 10 000 jest dokładnie 1229 liczb pierwszych").toHaveLength(1229);
  });

  it("skaluje się ~liniowo, nie kwadratowo", () => {
    expectScaling({
      fn: (n) => sieve(n),
      makeInput: (size) => size,
      sizes: [100000, 1000000],
      expect: "linear",
    });
  });
});

describe("collatzLength", () => {
  it("liczy długość ciągu z oboma końcami", () => {
    expect(
      collatzLength(6),
      "ciąg 6→3→10→5→16→8→4→2→1 ma 9 elementów — licz też startowe n i końcowe 1",
    ).toBe(9);
    expect(collatzLength(27)).toBe(112);
  });

  it("dla n = 1 zwraca 1", () => {
    expect(collatzLength(1), "ciąg zaczynający się od 1 to sam element [1]").toBe(1);
  });
});
