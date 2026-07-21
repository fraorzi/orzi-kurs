import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("limity rekordu wejściowego", () => {
  it("przepuszcza poprawny rekord i zwraca tylko trzy pola", () => {
    const result = solve({
      type: "email",
      text: "treść",
      cost: 10,
      extra: "nie przechodź",
    });
    expect(result).toEqual({ type: "email", text: "treść", cost: 10 });
    expect("extra" in result).toBe(false);
  });

  it("odrzuca wartości nie będące zwykłym obiektem", () => {
    expect(() => solve(null)).toThrow();
    expect(() => solve("rekord")).toThrow();
    expect(() => solve(42)).toThrow();
  });

  it("odrzuca typ spoza allow-listy", () => {
    expect(() => solve({ type: "spam", text: "x", cost: 1 })).toThrow();
  });

  it("limit tekstu liczy bajty, nie znaki", () => {
    expect(() => solve({ type: "email", text: "ż".repeat(600), cost: 1 })).toThrow();
    expect(solve({ type: "email", text: "a".repeat(1024), cost: 1 }).text)
      .toHaveLength(1024);
  });

  it("odrzuca koszt niefinityczny i spoza zakresu", () => {
    for (const cost of [Number.NaN, Number.POSITIVE_INFINITY, -1, 1001]) {
      expect(() => solve({ type: "report", text: "x", cost })).toThrow();
    }
  });
});
