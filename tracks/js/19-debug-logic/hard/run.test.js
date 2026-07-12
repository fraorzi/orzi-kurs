import { describe, it, expect } from "vitest";
import { expectScaling } from "@harness/bench";
import { firstDuplicate } from "./starter.js";

describe("firstDuplicate — poprawność", () => {
  it("zwraca pierwszą powtórzoną wartość (najwcześniejsze drugie wystąpienie)", () => {
    expect(
      firstDuplicate([2, 1, 3, 5, 3, 2]),
      "drugie 3 (indeks 4) pada przed drugim 2 (indeks 5), więc pierwszym duplikatem jest 3",
    ).toBe(3);
  });

  it("zwraca null, gdy nie ma duplikatów", () => {
    expect(firstDuplicate([1, 2, 3])).toBe(null);
    expect(firstDuplicate([])).toBe(null);
  });

  it("wykrywa duplikat sąsiadujący", () => {
    expect(firstDuplicate([1, 1])).toBe(1);
  });
});

describe("firstDuplicate — złożoność", () => {
  it("działa w czasie liniowym, nie kwadratowym", () => {
    expectScaling({
      fn: (input) => firstDuplicate(input),
      makeInput: (n) => Array.from({ length: n }, (_, i) => i), // brak duplikatów = najgorszy przypadek
      sizes: [1000, 10000],
      expect: "linear",
    });
  });
});
