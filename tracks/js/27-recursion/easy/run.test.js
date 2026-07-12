import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { factorial, pow } from "./starter.js";

const src = readFileSync(new URL("./starter.js", import.meta.url), "utf8");

describe("factorial", () => {
  it("factorial(0) i factorial(1) to 1 (przypadek bazowy)", () => {
    expect(factorial(0), "baza rekurencji: 0! = 1").toBe(1);
    expect(factorial(1)).toBe(1);
  });

  it("liczy silnię dla n > 1", () => {
    expect(factorial(5)).toBe(120);
    expect(factorial(6)).toBe(720);
  });
});

describe("pow", () => {
  it("pow(base, 0) to 1 (przypadek bazowy)", () => {
    expect(pow(2, 0), "baza: dowolna liczba do potęgi 0 to 1").toBe(1);
  });

  it("liczy potęgę dla exp > 0", () => {
    expect(pow(2, 10)).toBe(1024);
    expect(pow(5, 3)).toBe(125);
  });

  it("nie używa ** ani Math.pow (ma być rekurencja)", () => {
    expect(
      /\*\*|Math\.pow/.test(src),
      "to zadanie ćwiczy rekurencję — policz potęgę mnożeniem w kroku rekurencyjnym, bez ** i Math.pow",
    ).toBe(false);
  });
});
