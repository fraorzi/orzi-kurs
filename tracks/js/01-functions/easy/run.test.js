import { describe, it, expect } from "vitest";
import { min, pow, greet } from "./starter.js";

describe("min", () => {
  it("zwraca mniejszą z dwóch liczb", () => {
    expect(min(2, 5)).toBe(2);
    expect(min(3, -1)).toBe(-1);
    expect(min(2, -2), "min(2, -2) to -2 — uważaj na liczby ujemne").toBe(-2);
  });

  it("dla równych argumentów zwraca tę wartość", () => {
    expect(min(1, 1)).toBe(1);
  });
});

describe("pow", () => {
  it("podnosi x do potęgi n", () => {
    expect(pow(2, 3), "2 * 2 * 2 = 8").toBe(8);
    expect(pow(3, 2)).toBe(9);
    expect(pow(10, 1), "x do potęgi 1 to x — pętla ma wykonać dokładnie jedno mnożenie").toBe(10);
  });

  it("działa dla podstawy ujemnej i zerowej", () => {
    expect(pow(-2, 3), "(-2) * (-2) * (-2) = -8").toBe(-8);
    expect(pow(0, 5)).toBe(0);
  });
});

describe("greet", () => {
  it("bez drugiego argumentu używa domyślnego powitania", () => {
    expect(greet("Ala"), 'greeting ma mieć wartość domyślną "Cześć" zadeklarowaną w sygnaturze').toBe("Cześć, Ala!");
  });

  it("z drugim argumentem używa podanego powitania", () => {
    expect(greet("Ola", "Hej")).toBe("Hej, Ola!");
  });

  it("jawne undefined też uruchamia wartość domyślną", () => {
    expect(
      greet("Jan", undefined),
      "wartość domyślna działa nie tylko przy braku argumentu, ale też dla jawnie przekazanego undefined",
    ).toBe("Cześć, Jan!");
  });
});
