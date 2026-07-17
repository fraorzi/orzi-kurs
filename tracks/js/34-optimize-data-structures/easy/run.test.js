import { describe, it, expect } from "vitest";
import { expectScaling } from "@harness/bench";
import { countInBoth } from "./starter.js";

describe("countInBoth — poprawność", () => {
  it("liczy różne wartości obecne w obu tablicach", () => {
    expect(countInBoth([1, 2, 3], [2, 3, 4])).toBe(2);
  });

  it("liczy wartości unikalnie (duplikaty nie zwiększają wyniku)", () => {
    expect(countInBoth([1, 1, 2], [2, 2]), "liczymy RÓŻNE wartości wspólne, nie pary").toBe(1);
  });

  it("zwraca 0, gdy brak części wspólnej", () => {
    expect(countInBoth([1, 2], [3, 4])).toBe(0);
  });
});

describe("countInBoth — złożoność", () => {
  it("[quality] działa w czasie liniowym, nie kwadratowym", () => {
    expectScaling({
      fn: ({ a, b }) => countInBoth(a, b),
      makeInput: (n) => ({
        a: Array.from({ length: n }, (_, i) => i),
        b: Array.from({ length: n }, (_, i) => i + Math.floor(n / 2)),
      }),
      sizes: [2000, 20000],
      expect: "linear",
    });
  });
});
