import { describe, it, expect } from "vitest";
import { formatValue, charCount, orDefault } from "./starter";

describe("formatValue", () => {
  it("string zwraca bez zmian", () => {
    expect(formatValue("abc")).toBe("abc");
  });

  it("liczbę formatuje z dwoma miejscami po przecinku", () => {
    expect(formatValue(12.5)).toBe("12.50");
  });

  it("true to \"tak\", false to \"nie\"", () => {
    expect(formatValue(true)).toBe("tak");
    expect(
      formatValue(false),
      "false jest falsy — zawężaj przez typeof, nie przez if (value)",
    ).toBe("nie");
  });

  it("zero to liczba, nie brak wartości", () => {
    expect(
      formatValue(0),
      "0 jest falsy — truthiness zgubiłaby ten przypadek",
    ).toBe("0.00");
  });
});

describe("charCount", () => {
  it("dla stringa zwraca jego długość", () => {
    expect(charCount("abc")).toBe(3);
  });

  it("dla tablicy sumuje długości elementów", () => {
    expect(
      charCount(["a", "bb"]),
      "tablica nie ma sensownego .length znaków — zawęź przez Array.isArray i zsumuj",
    ).toBe(3);
  });

  it("pusta tablica i pusty string dają 0", () => {
    expect(charCount([])).toBe(0);
    expect(charCount("")).toBe(0);
  });
});

describe("orDefault", () => {
  it("zwraca wartość, gdy jest podana", () => {
    expect(orDefault("abc", "-")).toBe("abc");
  });

  it("pusty string jest poprawną wartością i nie jest podmieniany", () => {
    expect(
      orDefault("", "-"),
      "\"\" jest falsy — zawężaj przez == null / !== undefined, nie przez truthiness",
    ).toBe("");
  });

  it("null i undefined dają fallback", () => {
    expect(orDefault(null, "-")).toBe("-");
    expect(orDefault(undefined, "-")).toBe("-");
  });
});
