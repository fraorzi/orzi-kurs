import { describe, it, expect } from "vitest";
import { compact, typeOf, isNumericString } from "./starter.js";

describe("compact", () => {
  it("usuwa wszystkie wartości falsy", () => {
    expect(
      compact([0, 1, false, 2, "", 3, null, undefined, NaN]),
      "falsy to dokładnie: false, 0, -0, 0n, '', null, undefined, NaN — wszystkie mają wylecieć",
    ).toEqual([1, 2, 3]);
  });

  it("zostawia wartości truthy, które wyglądają na puste", () => {
    const arr = [];
    expect(
      compact(["a", " ", arr, 0]),
      "spacja i pusta tablica są truthy — nie wolno ich usuwać",
    ).toEqual(["a", " ", arr]);
  });

  it("nie mutuje wejścia", () => {
    const input = [0, 1, 2];
    compact(input);
    expect(input, "compact ma zwracać nową tablicę, nie modyfikować wejścia").toEqual([0, 1, 2]);
  });
});

describe("typeOf", () => {
  it("dla null zwraca 'null', nie 'object'", () => {
    expect(
      typeOf(null),
      "typeof null zwraca 'object' przez historyczny błąd języka — obsłuż null osobno PRZED typeof",
    ).toBe("null");
  });

  it("dla pozostałych wartości działa jak typeof", () => {
    expect(typeOf(42)).toBe("number");
    expect(typeOf("abc")).toBe("string");
    expect(typeOf(undefined)).toBe("undefined");
    expect(typeOf({})).toBe("object");
    expect(typeOf(true)).toBe("boolean");
  });
});

describe("isNumericString", () => {
  it("akceptuje stringi liczbowe, także z białymi znakami i ujemne", () => {
    expect(isNumericString("12")).toBe(true);
    expect(isNumericString("  12 ")).toBe(true);
    expect(isNumericString("-3.5")).toBe(true);
  });

  it("odrzuca pusty string mimo że Number('') === 0", () => {
    expect(
      isNumericString(""),
      "Number('') zwraca 0, więc sama konwersja nie wystarczy — pusty string po trim musi być odrzucony jawnie",
    ).toBe(false);
    expect(isNumericString("   ")).toBe(false);
  });

  it("odrzuca stringi nieliczbowe i wartości niebędące stringiem", () => {
    expect(isNumericString("12px")).toBe(false);
    expect(isNumericString("abc")).toBe(false);
    expect(isNumericString(12), "liczba nie jest stringiem — najpierw sprawdź typeof").toBe(false);
    expect(isNumericString(null)).toBe(false);
  });
});
