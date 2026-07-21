import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("walidacja payloadu publikacji", () => {
  it("przycina title i zwraca oczyszczony payload dla poprawnych danych", () => {
    expect(solve({ title: " Artykuł ", locale: "pl" })).toEqual({ title: "Artykuł", locale: "pl" });
  });

  it("odrzuca zbyt krótki title (po trymowaniu)", () => {
    expect(() => solve({ title: "x", locale: "pl" })).toThrow(/title/);
    expect(() => solve({ title: "   ", locale: "pl" })).toThrow(/title/);
  });

  it("odrzuca niepoprawny format locale", () => {
    expect(() => solve({ title: "Artykuł", locale: "PL" })).toThrow(/locale/);
    expect(() => solve({ title: "Artykuł", locale: "polski" })).toThrow(/locale/);
  });

  it("odrzuca wejście, które nie jest obiektem", () => {
    expect(() => solve(null)).toThrow(/body/);
    expect(() => solve("Artykuł")).toThrow(/body/);
  });

  it("sprawdza kształt przed title, a title przed locale", () => {
    expect(() => solve(undefined)).toThrow(/body/);
    expect(() => solve({ title: "ab", locale: "invalid-locale" })).toThrow(/title/);
  });
});
