import { describe, it, expect } from "vitest";
import { normalizeUser, zip, partition } from "./starter.js";

describe("normalizeUser", () => {
  it("przycina name, konwertuje age i zbiera resztę do meta", () => {
    expect(normalizeUser({ name: "  Ala ", role: "admin" })).toEqual({
      name: "Ala",
      age: 18,
      meta: { role: "admin" },
    });
    expect(normalizeUser({ name: "Jan", age: "30", city: "Łódź", vip: true })).toEqual({
      name: "Jan",
      age: 30,
      meta: { city: "Łódź", vip: true },
    });
  });

  it("age domyślnie 18", () => {
    expect(normalizeUser({ name: "X" }).age).toBe(18);
  });

  it("rzuca TypeError przy braku sensownego name", () => {
    expect(() => normalizeUser({}), "brak name musi być odrzucony").toThrow(TypeError);
    expect(
      () => normalizeUser({ name: "   " }),
      "name z samych białych znaków po trim jest puste — też odrzuć",
    ).toThrow(TypeError);
  });

  it("meta nie zawiera name ani age", () => {
    const result = normalizeUser({ name: "A", age: 20, x: 1 });
    expect(
      result.meta,
      "rest w destrukturyzacji { name, age = 18, ...rest } zbiera WYŁĄCZNIE pozostałe klucze",
    ).toEqual({ x: 1 });
  });
});

describe("zip", () => {
  it("skleja tablice w krotki po indeksach", () => {
    expect(zip([1, 2, 3], ["a", "b", "c"])).toEqual([
      [1, "a"],
      [2, "b"],
      [3, "c"],
    ]);
  });

  it("przycina do najkrótszej tablicy", () => {
    expect(
      zip([1, 2, 3], ["a", "b"]),
      "wynik nie może zawierać undefined z krótszych tablic — długość to minimum długości wejść",
    ).toEqual([
      [1, "a"],
      [2, "b"],
    ]);
    expect(zip([1, 2], ["a", "b"], [true])).toEqual([[1, "a", true]]);
  });

  it("bez argumentów zwraca pustą tablicę", () => {
    expect(zip()).toEqual([]);
  });
});

describe("partition", () => {
  it("dzieli elementy na spełniające i niespełniające predykat", () => {
    expect(partition([1, 2, 3, 4], (x) => x % 2 === 0)).toEqual([
      [2, 4],
      [1, 3],
    ]);
  });

  it("zachowuje kolejność i działa dla pustej tablicy", () => {
    expect(partition([], (x) => x)).toEqual([[], []]);
    const [pass, fail] = partition(["a", "bb", "c"], (s) => s.length === 1);
    expect(pass).toEqual(["a", "c"]);
    expect(fail).toEqual(["bb"]);
  });
});
