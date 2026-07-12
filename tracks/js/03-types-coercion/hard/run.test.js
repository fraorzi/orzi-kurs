import { describe, it, expect } from "vitest";
import { looseEq } from "./starter.js";

describe("looseEq", () => {
  it("null i undefined są równe sobie nawzajem", () => {
    expect(looseEq(null, undefined), "reguła specjalna: null == undefined → true").toBe(true);
    expect(looseEq(undefined, null)).toBe(true);
    expect(looseEq(null, null)).toBe(true);
    expect(looseEq(undefined, undefined)).toBe(true);
  });

  it("null i undefined NIE są równe niczemu innemu", () => {
    expect(
      looseEq(null, 0),
      "null == 0 to false — null nie przechodzi konwersji na liczbę w algorytmie ==, równa się tylko undefined",
    ).toBe(false);
    expect(looseEq(undefined, "")).toBe(false);
    expect(looseEq(null, false)).toBe(false);
  });

  it("number vs string: string konwertowany na liczbę", () => {
    expect(looseEq(0, ""), "'' konwertuje się na 0").toBe(true);
    expect(looseEq(1, "1")).toBe(true);
    expect(looseEq(1, "2")).toBe(false);
  });

  it("boolean konwertowany na liczbę", () => {
    expect(looseEq("1", true), "true → 1, potem '1' → 1").toBe(true);
    expect(looseEq(0, false)).toBe(true);
    expect(looseEq("", false)).toBe(true);
    expect(looseEq("true", true), "'true' NIE konwertuje się na 1 — to NaN").toBe(false);
  });

  it("obiekt konwertowany na prymityw (valueOf, potem toString)", () => {
    expect(looseEq([1], "1"), "[1] przez toString daje '1'").toBe(true);
    expect(looseEq([1], 1)).toBe(true);
    expect(looseEq([], 0), "[] przez toString daje '', a '' → 0").toBe(true);
    const box = { valueOf: () => 7 };
    expect(looseEq(box, 7), "jeśli valueOf zwraca prymityw, używamy go zamiast toString").toBe(true);
  });

  it("ten sam typ porównywany jak ===", () => {
    expect(looseEq(NaN, NaN), "oba operandy to number, a NaN !== NaN").toBe(false);
    expect(looseEq("a", "a")).toBe(true);
    expect(looseEq({}, {}), "dwa różne obiekty to różne referencje — konwersji nie ma").toBe(false);
    const obj = {};
    expect(looseEq(obj, obj)).toBe(true);
  });
});
