import { describe, it, expect } from "vitest";
import { parseMoney, formatMoney } from "./starter.js";

describe("parseMoney", () => {
  it("zamienia kwotę na grosze (liczba całkowita)", () => {
    expect(parseMoney("12.34")).toBe(1234);
    expect(parseMoney("0.05"), "jedna kropka, dwie cyfry groszy — 5 groszy").toBe(5);
  });

  it("brak części ułamkowej to 00 groszy", () => {
    expect(parseMoney("100")).toBe(10000);
  });

  it("jedna cyfra po kropce znaczy dziesiątki groszy", () => {
    expect(parseMoney("12.3"), "'.3' to 30 groszy — uzupełnij część groszową do 2 cyfr").toBe(1230);
  });
});

describe("formatMoney", () => {
  it("formatuje grosze z powrotem na kwotę", () => {
    expect(formatMoney(1234)).toBe("12.34");
    expect(formatMoney(5), "5 groszy to '0.05' — wyrównaj grosze do 2 cyfr").toBe("0.05");
    expect(formatMoney(10000)).toBe("100.00");
  });
});

describe("round-trip", () => {
  it("parseMoney(formatMoney(c)) zwraca c", () => {
    for (const c of [0, 5, 99, 100, 1234, 10000, 305]) {
      expect(parseMoney(formatMoney(c)), `konwersja w obie strony ma być odwracalna dla ${c}`).toBe(
        c,
      );
    }
  });
});
