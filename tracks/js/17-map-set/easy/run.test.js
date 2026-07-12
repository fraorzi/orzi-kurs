import { describe, it, expect } from "vitest";
import { unique, countWords } from "./starter.js";

describe("unique", () => {
  it("usuwa duplikaty, zachowując kolejność pierwszych wystąpień", () => {
    expect(unique(["Hare", "Krishna", "Hare", "Krishna", ":-O"])).toEqual([
      "Hare",
      "Krishna",
      ":-O",
    ]);
    expect(unique([1, 1, 2, 3, 2])).toEqual([1, 2, 3]);
  });

  it("zwraca nową tablicę (Array), nie Set", () => {
    const out = unique([1, 2]);
    expect(
      Array.isArray(out),
      "wynik ma być tablicą — po deduplikacji Setem przekonwertuj z powrotem ([...set] lub Array.from)",
    ).toBe(true);
  });

  it("traktuje NaN jako jedną wartość (SameValueZero w Set)", () => {
    expect(
      unique([NaN, NaN, 1]),
      "Set porównuje przez SameValueZero, gdzie NaN === NaN — dlatego zostaje jeden NaN",
    ).toEqual([NaN, 1]);
  });
});

describe("countWords", () => {
  it("zwraca Map ze zliczeniami wystąpień", () => {
    const result = countWords(["a", "b", "a", "a"]);
    expect(result instanceof Map, "wynik ma być instancją Map").toBe(true);
    expect(result.get("a"), "'a' występuje 3 razy").toBe(3);
    expect(result.get("b")).toBe(1);
  });

  it("dla pustego wejścia zwraca pustą Map", () => {
    expect(countWords([]).size).toBe(0);
  });

  it("kolejność kluczy to kolejność pierwszego wystąpienia", () => {
    expect(
      [...countWords(["z", "a", "z"]).keys()],
      "Map zachowuje kolejność wstawiania — pierwszy zobaczony klucz jest pierwszy",
    ).toEqual(["z", "a"]);
  });
});
