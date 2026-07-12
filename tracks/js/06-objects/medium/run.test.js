import { describe, it, expect } from "vitest";
import { multiplyNumeric, pick, invert } from "./starter.js";

describe("multiplyNumeric", () => {
  it("mnoży ×2 tylko wartości liczbowe", () => {
    expect(multiplyNumeric({ width: 200, height: 300, title: "Menu" })).toEqual({
      width: 400,
      height: 600,
      title: "Menu",
    });
  });

  it("nie mutuje wejścia", () => {
    const input = { width: 10 };
    multiplyNumeric(input);
    expect(input.width, "funkcja ma zwracać nowy obiekt — sprawdź, czy nie piszesz po wejściu").toBe(10);
  });

  it("stringi liczbowe NIE są mnożone", () => {
    expect(
      multiplyNumeric({ count: "5" }),
      "'5' to string — sprawdzaj typeof value === 'number', nie konwertuj",
    ).toEqual({ count: "5" });
  });
});

describe("pick", () => {
  it("wybiera tylko wskazane klucze", () => {
    expect(pick({ a: 1, b: 2, c: 3 }, ["a", "c"])).toEqual({ a: 1, c: 3 });
  });

  it("pomija klucze nieobecne w obiekcie", () => {
    expect(
      pick({ a: 1 }, ["a", "zzz"]),
      "klucz zzz nie istnieje w obiekcie — w wyniku nie może pojawić się zzz: undefined",
    ).toEqual({ a: 1 });
  });

  it("pusta lista kluczy daje pusty obiekt", () => {
    expect(pick({ a: 1 }, [])).toEqual({});
  });
});

describe("invert", () => {
  it("zamienia klucze z wartościami", () => {
    expect(invert({ a: "1", b: "2" })).toEqual({ 1: "a", 2: "b" });
  });

  it("nie mutuje wejścia", () => {
    const input = { a: "1" };
    invert(input);
    expect(input).toEqual({ a: "1" });
  });
});
