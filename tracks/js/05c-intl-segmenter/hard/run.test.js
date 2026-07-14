import { describe, it, expect } from "vitest";
import { analyze } from "./starter.js";

describe("analyze", () => {
  it("liczy słowa i zdania", () => {
    const r = analyze("The cat sat. The cat ran fast.", "en");
    expect(r.words, "7 segmentów isWordLike").toBe(7);
    expect(r.sentences, "dwa zdania oddzielone kropką").toBe(2);
  });

  it("uniqueWords nie rozróżnia wielkości liter", () => {
    const r = analyze("The cat sat. The cat ran fast.", "en");
    expect(
      r.uniqueWords,
      "różne słowa po lowercase: the, cat, sat, ran, fast = 5",
    ).toBe(5);
  });

  it("longestWord przy remisie zwraca pierwsze najdłuższe", () => {
    const r = analyze("The quick brown fox. The fox jumps.", "en");
    expect(
      r.longestWord,
      "quick, brown, jumps mają po 5 liter — wygrywa pierwsze (quick)",
    ).toBe("quick");
  });

  it("zachowuje oryginalną pisownię najdłuższego słowa", () => {
    expect(analyze("Ala MA najdłuższego kota.", "pl").longestWord).toBe("najdłuższego");
  });

  it("dla pustego tekstu zwraca zerowe podsumowanie", () => {
    expect(analyze("   ", "en")).toEqual({
      words: 0,
      sentences: 0,
      uniqueWords: 0,
      longestWord: "",
    });
  });
});
