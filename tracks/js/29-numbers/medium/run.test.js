import { describe, it, expect } from "vitest";
import { approxEqual, toFixedNumber } from "./starter.js";

describe("approxEqual", () => {
  it("uznaje 0.1 + 0.2 za równe 0.3 (czego === nie robi)", () => {
    expect(0.1 + 0.2 === 0.3, "kontrola: bezpośrednie === faktycznie zawodzi").toBe(false);
    expect(
      approxEqual(0.1 + 0.2, 0.3),
      "porównuj z tolerancją: |a - b| < tolerance, nie przez ===",
    ).toBe(true);
  });

  it("false, gdy różnica przekracza tolerancję", () => {
    expect(approxEqual(1, 1.5)).toBe(false);
  });

  it("respektuje przekazaną tolerancję", () => {
    expect(approxEqual(1, 1.0000000001, 1e-6)).toBe(true);
    expect(approxEqual(1, 1.1, 1e-6)).toBe(false);
  });
});

describe("toFixedNumber", () => {
  it("zaokrągla do wskazanych miejsc i zwraca liczbę", () => {
    expect(toFixedNumber(3.14159, 2)).toBe(3.14);
  });

  it("zwraca number, nie string", () => {
    expect(
      typeof toFixedNumber(5, 2),
      "toFixed daje string ('5.00') — opakuj wynik w Number(...)",
    ).toBe("number");
    expect(toFixedNumber(5, 2)).toBe(5);
  });
});
