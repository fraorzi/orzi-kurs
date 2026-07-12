import { describe, it, expect } from "vitest";
import { aclean, objectToMap, mapToObject } from "./starter.js";

const canonical = (w) => w.toLowerCase().split("").sort().join("");

describe("aclean", () => {
  const input = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

  it("zostawia dokładnie jedno słowo z każdej grupy anagramów", () => {
    const result = aclean(input);
    expect(
      result.length,
      "są 3 grupy anagramów: {nap,PAN}, {teachers,cheaters,hectares}, {ear,era}",
    ).toBe(3);
  });

  it("każde zwrócone słowo pochodzi z wejścia", () => {
    for (const word of aclean(input)) {
      expect(input.includes(word), `'${word}' nie było w wejściu`).toBe(true);
    }
  });

  it("każda grupa anagramów jest reprezentowana raz (klucz = posortowane litery)", () => {
    const keys = aclean(input).map(canonical);
    const expectedGroups = new Set(input.map(canonical));
    expect(
      new Set(keys).size,
      "reprezentanci mają pokryć wszystkie grupy bez powtórek — grupuj w Map po posortowanych literach",
    ).toBe(expectedGroups.size);
    expect(new Set(keys)).toEqual(expectedGroups);
  });
});

describe("objectToMap / mapToObject", () => {
  it("objectToMap tworzy Map z par klucz-wartość obiektu", () => {
    const m = objectToMap({ a: 1, b: 2 });
    expect(m instanceof Map).toBe(true);
    expect(m.get("a")).toBe(1);
    expect(m.get("b")).toBe(2);
    expect(m.size).toBe(2);
  });

  it("mapToObject odwraca konwersję", () => {
    const m = new Map([
      ["a", 1],
      ["b", 2],
    ]);
    expect(
      mapToObject(m),
      "Object.fromEntries zamienia pary [klucz, wartość] z Map na obiekt",
    ).toEqual({ a: 1, b: 2 });
  });

  it("konwersja w obie strony zachowuje dane (round-trip)", () => {
    const obj = { x: 10, y: 20 };
    expect(mapToObject(objectToMap(obj))).toEqual(obj);
  });
});
