import { describe, it, expect } from "vitest";
import {
  ValidationError,
  PropertyRequiredError,
  ReadError,
  readUser,
} from "./starter.js";

describe("hierarchia błędów", () => {
  it("PropertyRequiredError dziedziczy po ValidationError i Error", () => {
    const e = new PropertyRequiredError("name");
    expect(e instanceof PropertyRequiredError).toBe(true);
    expect(
      e instanceof ValidationError,
      "PropertyRequiredError ma extends ValidationError — inaczej catch po ValidationError go pominie",
    ).toBe(true);
    expect(e instanceof Error).toBe(true);
  });

  it("PropertyRequiredError ma pole property i opisowy message", () => {
    const e = new PropertyRequiredError("age");
    expect(e.property, "zapisz przekazaną nazwę pola do this.property").toBe("age");
    expect(e.message).toBe("Brak właściwości: age");
    expect(e.name).toBe("PropertyRequiredError");
  });
});

describe("readUser — sukces", () => {
  it("zwraca sparsowanego użytkownika, gdy JSON jest poprawny i kompletny", () => {
    expect(readUser('{"name":"Ala","age":30}')).toEqual({ name: "Ala", age: 30 });
  });
});

describe("readUser — zawijanie błędów w ReadError z cause", () => {
  it("zły JSON zawija SyntaxError w ReadError, zachowując przyczynę w cause", () => {
    let thrown;
    try {
      readUser("{ zły json");
    } catch (e) {
      thrown = e;
    }
    expect(thrown instanceof ReadError, "błąd składni ma być zawinięty w ReadError").toBe(true);
    expect(
      thrown.cause instanceof SyntaxError,
      "oryginalny SyntaxError ma trafić do cause — inaczej gubisz przyczynę (super(msg, { cause }))",
    ).toBe(true);
  });

  it("brak wymaganego pola zawija PropertyRequiredError w ReadError", () => {
    let thrown;
    try {
      readUser('{"age":30}');
    } catch (e) {
      thrown = e;
    }
    expect(thrown instanceof ReadError).toBe(true);
    expect(
      thrown.cause instanceof PropertyRequiredError,
      "błąd walidacji ma być rozpoznany przez instanceof ValidationError i zawinięty z cause",
    ).toBe(true);
    expect(thrown.cause.property, "cause ma nieść info, którego pola brakuje").toBe("name");
  });
});

describe("readUser — rethrow nieznanych błędów", () => {
  it("nieznany błąd (TypeError z 'null') jest przerzucony dalej, NIE zawinięty w ReadError", () => {
    expect(
      () => readUser("null"),
      "w catch zawijaj tylko znane błędy (SyntaxError, ValidationError); nieznane przerzuć przez throw err",
    ).toThrow(TypeError);
  });
});
