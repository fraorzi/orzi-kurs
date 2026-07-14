import { describe, it, expect } from "vitest";
import { countWords, wordList } from "./starter.js";

describe("countWords", () => {
  it("liczy słowa pomijając spacje i interpunkcję", () => {
    expect(
      countWords("Ala ma kota, tak?", "pl"),
      "isWordLike jest false dla przecinka, znaku zapytania i spacji — liczą się tylko słowa",
    ).toBe(4);
  });

  it("traktuje apostrof w środku i liczbę jako słowo", () => {
    expect(
      countWords("It's 3 cats!", "en"),
      "'It's' to jeden segment słowa, '3' też jest isWordLike — razem 3",
    ).toBe(3);
  });

  it("dla samych białych znaków zwraca 0", () => {
    expect(countWords("   ", "en"), "brak segmentów isWordLike → 0 słów").toBe(0);
  });
});

describe("wordList", () => {
  it("zwraca same słowa w kolejności wystąpienia", () => {
    expect(wordList("  hello   world  ", "en")).toEqual(["hello", "world"]);
  });

  it("odfiltrowuje interpunkcję, zostawia słowa", () => {
    expect(wordList("Ala ma kota, tak?", "pl")).toEqual(["Ala", "ma", "kota", "tak"]);
  });
});
