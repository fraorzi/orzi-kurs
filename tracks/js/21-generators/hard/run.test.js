import { describe, it, expect } from "vitest";
import { fibonacci, accumulator } from "./starter.js";

function firstN(gen, n) {
  const out = [];
  for (const value of gen) {
    out.push(value);
    if (out.length >= n) break;
  }
  return out;
}

describe("fibonacci", () => {
  it("wydaje ciąg Fibonacciego od 0, 1", () => {
    expect(
      firstN(fibonacci(), 8),
      "start od a=0, b=1; po każdym yield a przesuwaj [a, b] = [b, a + b]",
    ).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
  });

  it("jest nieskończony (można brać leniwie dużo)", () => {
    expect(firstN(fibonacci(), 12).length).toBe(12);
  });
});

describe("accumulator", () => {
  it("pierwsze next() zwraca 0 (priming, argument ignorowany)", () => {
    const acc = accumulator();
    expect(
      acc.next(999).value,
      "pierwszy next uruchamia generator do pierwszego yield — nie ma zawieszonego yield, do którego trafiłby argument",
    ).toBe(0);
  });

  it("kolejne next(x) sumują przekazywane wartości", () => {
    const acc = accumulator();
    acc.next(); // priming
    expect(acc.next(10).value).toBe(10);
    expect(
      acc.next(5).value,
      "wartość z next(x) staje się wynikiem wyrażenia yield — dodaj ją do sumy",
    ).toBe(15);
    expect(acc.next(3).value).toBe(18);
  });

  it("każdy accumulator ma niezależny stan", () => {
    const a = accumulator();
    const b = accumulator();
    a.next();
    b.next();
    a.next(100);
    expect(b.next(1).value, "dwa generatory mają osobny total").toBe(1);
  });
});
