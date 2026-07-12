import { describe, it, expect } from "vitest";
import { fizzBuzz, sumRange, countVowels } from "./starter.js";

describe("fizzBuzz", () => {
  it("zastępuje wielokrotności 3, 5 i obu naraz", () => {
    expect(fizzBuzz(15)).toEqual([
      1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz",
    ]);
  });

  it("wielokrotność 15 to 'FizzBuzz', nie 'Fizz'", () => {
    expect(
      fizzBuzz(15)[14],
      "warunek na wielokrotność 3 I 5 musi być sprawdzony PRZED pojedynczymi — inaczej 15 złapie się na 3",
    ).toBe("FizzBuzz");
  });

  it("liczby niezastąpione zostają liczbami, nie stringami", () => {
    expect(fizzBuzz(2), "1 i 2 mają być typu number").toEqual([1, 2]);
  });
});

describe("sumRange", () => {
  it("sumuje zakres włącznie z oboma końcami", () => {
    expect(sumRange(1, 5), "1+2+3+4+5 = 15 — sprawdź warunek i <= b, nie i < b").toBe(15);
    expect(sumRange(3, 3), "zakres jednoelementowy to sam a").toBe(3);
  });

  it("dla a > b zwraca 0", () => {
    expect(sumRange(5, 1)).toBe(0);
  });

  it("działa dla liczb ujemnych", () => {
    expect(sumRange(-2, 2)).toBe(0);
    expect(sumRange(-3, -1)).toBe(-6);
  });
});

describe("countVowels", () => {
  it("liczy samogłoski niezależnie od wielkości liter", () => {
    expect(countVowels("JavaScript")).toBe(3);
    expect(countVowels("AEIOU"), "wielkie litery też są samogłoskami — znormalizuj przez toLowerCase").toBe(5);
  });

  it("string bez samogłosek daje 0", () => {
    expect(countVowels("XYZ")).toBe(0);
    expect(countVowels("")).toBe(0);
  });
});
