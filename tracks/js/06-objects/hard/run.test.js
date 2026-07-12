import { describe, it, expect } from "vitest";
import { getPath, mapValues, groupBy } from "./starter.js";

describe("getPath", () => {
  const user = { address: { street: null, city: "Łódź" }, scores: { math: 0 } };

  it("czyta wartość po ścieżce z kropkami", () => {
    expect(getPath(user, "address.city", "?")).toBe("Łódź");
  });

  it("fallback tylko dla undefined — null jest zwracany wprost", () => {
    expect(
      getPath(user, "address.street", "?"),
      "null znaleziony na końcu ścieżki to legalna wartość — fallback dotyczy wyłącznie undefined (semantyka _.get)",
    ).toBe(null);
    expect(getPath(user, "address.zip", "?")).toBe("?");
  });

  it("zerwana ścieżka daje fallback zamiast TypeError", () => {
    expect(
      getPath({}, "a.b.c", "?"),
      "wejście na undefined w środku ścieżki nie może rzucać — przerwij i zwróć fallback",
    ).toBe("?");
    expect(getPath({ a: null }, "a.b", "?")).toBe("?");
  });

  it("wartości falsy są pełnoprawne", () => {
    expect(getPath(user, "scores.math", 100), "0 to poprawny wynik — nie używaj || do fallbacku").toBe(0);
  });
});

describe("mapValues", () => {
  it("mapuje wartości, zachowując klucze", () => {
    expect(mapValues({ a: 1, b: 2 }, (v) => v * 10)).toEqual({ a: 10, b: 20 });
  });

  it("fn dostaje wartość i klucz", () => {
    expect(mapValues({ x: 1 }, (v, k) => `${k}=${v}`)).toEqual({ x: "x=1" });
  });

  it("nie mutuje wejścia", () => {
    const input = { a: 1 };
    mapValues(input, (v) => v + 1);
    expect(input).toEqual({ a: 1 });
  });
});

describe("groupBy", () => {
  it("grupuje elementy po kluczu z keyFn", () => {
    expect(groupBy([6.1, 4.2, 6.3], Math.floor)).toEqual({ 4: [4.2], 6: [6.1, 6.3] });
  });

  it("zachowuje kolejność elementów w grupach", () => {
    expect(groupBy(["one", "two", "three"], (s) => s.length)).toEqual({
      3: ["one", "two"],
      5: ["three"],
    });
  });

  it("pusta tablica daje pusty obiekt", () => {
    expect(groupBy([], (x) => x)).toEqual({});
  });
});
