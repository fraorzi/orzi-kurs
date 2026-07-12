import { describe, it, expect } from "vitest";
import { extractUser, topSalary, mergeSettings } from "./starter.js";

describe("extractUser", () => {
  it("wyciąga name, years i isAdmin", () => {
    expect(extractUser({ name: "John", years: 30 })).toEqual(["John", 30, false]);
  });

  it("default isAdmin = false działa tylko przy braku klucza", () => {
    expect(
      extractUser({ name: "Ala", years: 20, isAdmin: true }),
      "jawnie ustawione isAdmin: true nie może być nadpisane defaultem",
    ).toEqual(["Ala", 20, true]);
  });
});

describe("topSalary", () => {
  it("zwraca nazwisko z najwyższą pensją", () => {
    expect(topSalary({ John: 100, Pete: 130, Mary: 250 })).toBe("Mary");
  });

  it("pusty obiekt daje null", () => {
    expect(topSalary({}), "brak wpisów = brak zwycięzcy — zwróć null, nie undefined").toBe(null);
  });

  it("jednoosobowy obiekt zwraca tę osobę", () => {
    expect(topSalary({ Solo: 1 })).toBe("Solo");
  });
});

describe("mergeSettings", () => {
  it("overrides nadpisują defaults", () => {
    expect(mergeSettings({ theme: "dark", size: 10 }, { theme: "light" })).toEqual({
      theme: "light",
      size: 10,
    });
  });

  it("flags są konkatenowane, nie nadpisywane", () => {
    expect(
      mergeSettings({ theme: "dark", flags: ["a"] }, { theme: "light", flags: ["b"] }),
      "zwykły spread nadpisałby flags z overrides — to pole wymaga jawnego złożenia [...a, ...b]",
    ).toEqual({ theme: "light", flags: ["a", "b"] });
  });

  it("brak flags po którejś stronie nie psuje konkatenacji", () => {
    expect(mergeSettings({ theme: "dark" }, { flags: ["x"] }).flags).toEqual(["x"]);
    expect(mergeSettings({ flags: ["y"] }, {}).flags).toEqual(["y"]);
  });

  it("nie mutuje wejść", () => {
    const defaults = { flags: ["a"] };
    mergeSettings(defaults, { flags: ["b"] });
    expect(defaults.flags).toEqual(["a"]);
  });
});
