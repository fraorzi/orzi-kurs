import { describe, it, expect } from "vitest";
import { splitSentences, longestSentence } from "./starter.js";

describe("splitSentences", () => {
  it("dzieli tekst na przycięte zdania", () => {
    expect(
      splitSentences("Hello world. How are you? I'm fine!", "en"),
      "segmenty zdań mają końcowe spacje — trzeba je przyciąć",
    ).toEqual(["Hello world.", "How are you?", "I'm fine!"]);
  });

  it("nie zwraca pustych zdań dla samych białych znaków", () => {
    expect(splitSentences("   ", "en"), "po trim() i odfiltrowaniu pustych zostaje []").toEqual([]);
  });

  it("zachowuje interpunkcję kończącą zdanie", () => {
    expect(splitSentences("Tak? Nie!", "pl")).toEqual(["Tak?", "Nie!"]);
  });
});

describe("longestSentence", () => {
  it("zwraca zdanie z największą liczbą słów", () => {
    expect(
      longestSentence("Short one. This sentence has clearly more words than the other!", "en"),
      "mierzymy liczbą słów (isWordLike), nie znaków",
    ).toBe("This sentence has clearly more words than the other!");
  });

  it("przy remisie zwraca pierwsze najdłuższe zdanie", () => {
    expect(
      longestSentence("One two three. Four five six.", "en"),
      "oba zdania mają po 3 słowa — ostre porównanie > zostawia pierwsze",
    ).toBe("One two three.");
  });

  it("dla pustego wejścia zwraca pusty string", () => {
    expect(longestSentence("   ", "en")).toBe("");
  });
});
