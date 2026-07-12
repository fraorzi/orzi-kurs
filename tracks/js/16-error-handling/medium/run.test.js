import { describe, it, expect } from "vitest";
import { ValidationError, validateUser } from "./starter.js";

describe("ValidationError", () => {
  it("jest instancją zarówno ValidationError, jak i Error", () => {
    const e = new ValidationError("x");
    expect(e instanceof ValidationError).toBe(true);
    expect(
      e instanceof Error,
      "klasa ma dziedziczyć po Error (extends Error) — inaczej stracisz stack i kompatybilność",
    ).toBe(true);
  });

  it("zachowuje message i ustawia name na 'ValidationError'", () => {
    const e = new ValidationError("złe dane");
    expect(e.message, "message ma trafić do super(message)").toBe("złe dane");
    expect(
      e.name,
      "ustaw this.name = 'ValidationError' — bez tego name pozostaje odziedziczone 'Error'",
    ).toBe("ValidationError");
  });
});

describe("validateUser", () => {
  it("zwraca użytkownika, gdy name i age są poprawne", () => {
    const user = { name: "Ala", age: 30 };
    expect(validateUser(user)).toBe(user);
  });

  it("rzuca ValidationError, gdy name jest pustym stringiem", () => {
    expect(
      () => validateUser({ name: "", age: 30 }),
      "pusty name jest niepoprawny — waliduj name jako niepusty string",
    ).toThrow(ValidationError);
    expect(() => validateUser({ name: "", age: 30 })).toThrow("name musi być niepustym stringiem");
  });

  it("rzuca ValidationError, gdy brakuje age lub nie jest liczbą", () => {
    expect(() => validateUser({ name: "Ala" })).toThrow(ValidationError);
    expect(
      () => validateUser({ name: "Ala", age: "30" }),
      "age jako string ma być odrzucone — sprawdzaj typeof === 'number'",
    ).toThrow("age musi być liczbą");
  });

  it("sprawdza name przed age (kolejność walidacji)", () => {
    expect(
      () => validateUser({ name: "", age: "zły" }),
      "przy błędnych obu polach ma polecieć błąd name — waliduj name jako pierwsze",
    ).toThrow("name musi być niepustym stringiem");
  });
});
