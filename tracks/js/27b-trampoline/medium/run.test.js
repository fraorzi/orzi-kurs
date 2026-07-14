import { describe, it, expect } from "vitest";
import { isEven, isOdd } from "./starter.js";

describe("isEven / isOdd — poprawność", () => {
  it("rozpoznaje 0", () => {
    expect(isEven(0)).toBe(true);
    expect(isOdd(0)).toBe(false);
  });

  it("rozpoznaje małe liczby", () => {
    expect(isEven(10)).toBe(true);
    expect(isEven(7)).toBe(false);
    expect(isOdd(7)).toBe(true);
    expect(isOdd(4)).toBe(false);
  });
});

describe("isEven / isOdd — głębokość", () => {
  it("działa dla dużego n bez przepełnienia stosu", () => {
    expect(
      isEven(100000),
      "rekurencja wzajemna na trampolinie nie rośnie na stosie — naiwna wersja rzuciłaby RangeError",
    ).toBe(true);
    expect(isOdd(100001)).toBe(true);
  });
});
