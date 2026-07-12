import { describe, it, expect } from "vitest";
import { roundTo, isInteger } from "./starter.js";

describe("roundTo", () => {
  it("zaokrągla do wskazanej liczby miejsc i zwraca liczbę", () => {
    expect(roundTo(3.14159, 2)).toBe(3.14);
    expect(roundTo(1.2345, 2)).toBe(1.23);
  });

  it("działa dla decimals = 0", () => {
    expect(roundTo(2.5, 0), "Math.round zaokrągla 0.5 w górę").toBe(3);
    expect(roundTo(2.4, 0)).toBe(2);
  });

  it("zwraca number, nie string (inaczej niż toFixed)", () => {
    expect(typeof roundTo(1.5, 1), "wynik ma być liczbą — użyj Math.round(...)/factor, nie toFixed").toBe(
      "number",
    );
  });
});

describe("isInteger", () => {
  it("true dla liczb całkowitych (także 5.0)", () => {
    expect(isInteger(5)).toBe(true);
    expect(isInteger(5.0)).toBe(true);
    expect(isInteger(-3)).toBe(true);
  });

  it("false dla ułamków, stringów i NaN (bez konwersji)", () => {
    expect(isInteger(5.5)).toBe(false);
    expect(isInteger("5"), "Number.isInteger nie konwertuje — string nie jest liczbą całkowitą").toBe(
      false,
    );
    expect(isInteger(NaN)).toBe(false);
    expect(isInteger(null)).toBe(false);
  });
});
