import { describe, it, expect } from "vitest";
import { stringifyFields, safeParse } from "./starter.js";

describe("stringifyFields", () => {
  it("zostawia tylko wskazane klucze i formatuje z wcięciem 2", () => {
    expect(
      stringifyFields({ a: 1, b: 2, c: 3 }, ["a", "c"]),
      "replacer-tablica działa jak whitelist kluczy; trzeci argument (2) to wcięcie",
    ).toBe('{\n  "a": 1,\n  "c": 3\n}');
  });

  it("wynik jest poprawnym JSON-em z samymi wybranymi polami", () => {
    const parsed = JSON.parse(stringifyFields({ x: 1, y: 2 }, ["y"]));
    expect(parsed).toEqual({ y: 2 });
  });
});

describe("safeParse", () => {
  it("parsuje poprawny JSON", () => {
    expect(safeParse('{"x":1}')).toEqual({ x: 1 });
  });

  it("zwraca fallback dla niepoprawnego JSON-a zamiast rzucać", () => {
    expect(
      safeParse("nie-json"),
      "JSON.parse rzuca SyntaxError — złap go i zwróć fallback (domyślnie null)",
    ).toBe(null);
    expect(safeParse("{zły", {}), "fallback ma być konfigurowalny").toEqual({});
  });
});
