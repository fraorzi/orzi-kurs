import { describe, it, expect } from "vitest";
import { sameValue, defaultTo } from "./starter.js";

describe("sameValue", () => {
  it("NaN jest równe NaN", () => {
    expect(
      sameValue(NaN, NaN),
      "NaN === NaN daje false — wykryj NaN przez x !== x (jedyna wartość nierówna samej sobie)",
    ).toBe(true);
  });

  it("0 i -0 są różne", () => {
    expect(
      sameValue(0, -0),
      "0 === -0 daje true — rozróżnij zera przez 1/x: Infinity vs -Infinity",
    ).toBe(false);
    expect(sameValue(-0, -0)).toBe(true);
    expect(sameValue(0, 0)).toBe(true);
  });

  it("dla pozostałych wartości działa jak ===", () => {
    expect(sameValue(1, 1)).toBe(true);
    expect(sameValue("a", "a")).toBe(true);
    expect(sameValue(1, "1")).toBe(false);
    expect(sameValue(null, undefined)).toBe(false);
    const obj = {};
    expect(sameValue(obj, obj)).toBe(true);
    expect(sameValue({}, {})).toBe(false);
  });
});

describe("defaultTo", () => {
  it("zwraca fallback dla null, undefined i NaN", () => {
    expect(defaultTo(null, 10)).toBe(10);
    expect(defaultTo(undefined, 10)).toBe(10);
    expect(
      defaultTo(NaN, 10),
      "NaN też ma dostać fallback — operator ?? tego nie obsłuży, sprawdź Number.isNaN",
    ).toBe(10);
  });

  it("zachowuje falsy wartości, które są pełnoprawne: 0, '' i false", () => {
    expect(defaultTo(0, 10), "0 to poprawna wartość — || by ją nadpisał, dlatego jest zakazany").toBe(0);
    expect(defaultTo("", "x")).toBe("");
    expect(defaultTo(false, true)).toBe(false);
  });

  it("zwraca value, gdy jest zwykłą wartością", () => {
    expect(defaultTo(5, 10)).toBe(5);
    expect(defaultTo("a", "x")).toBe("a");
  });
});
