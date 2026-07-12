import { describe, it, expect } from "vitest";
import { findAnagrams, slugify } from "./starter.js";

describe("findAnagrams", () => {
  it("znajduje anagramy niezależnie od wielkości liter", () => {
    expect(findAnagrams("listen", ["enlists", "google", "inlets", "banana"])).toEqual(["inlets"]);
    expect(findAnagrams("master", ["stream", "pigeon", "maters"])).toEqual(["stream", "maters"]);
    expect(findAnagrams("Orchestra", ["cashregister", "Carthorse", "radishes"])).toEqual(["Carthorse"]);
  });

  it("słowo nie jest własnym anagramem", () => {
    expect(
      findAnagrams("go", ["go", "GO", "og"]),
      "identyczne słowo (nawet w innej wielkości liter) trzeba odrzucić PRZED porównaniem posortowanych liter",
    ).toEqual(["og"]);
  });

  it("kandydat o innej długości nie jest anagramem", () => {
    expect(findAnagrams("ab", ["aab", "a", "ba"])).toEqual(["ba"]);
  });

  it("zachowuje oryginalną pisownię kandydatów", () => {
    expect(findAnagrams("stone", ["Notes", "tones"])).toEqual(["Notes", "tones"]);
  });
});

describe("slugify", () => {
  it("usuwa polskie diakrytyki, w tym ł", () => {
    expect(
      slugify("Zażółć gęślą jaźń!"),
      "normalize('NFD') rozkłada ż/ó/ć/ę/ś/ź na literę + znak łączący, ale ł wymaga osobnej zamiany",
    ).toBe("zazolc-gesla-jazn");
    expect(slugify("Łódź")).toBe("lodz");
  });

  it("zamienia sekwencje nie-alfanumeryczne na pojedynczy myślnik", () => {
    expect(slugify("Hello,  World")).toBe("hello-world");
    expect(slugify("a + b = c")).toBe("a-b-c");
  });

  it("nie zostawia myślników na brzegach ani podwójnych", () => {
    expect(
      slugify("--Już--gotowe--"),
      "po zamianie znaków specjalnych mogą zostać myślniki wiodące/końcowe/podwójne — zbij je i przytnij",
    ).toBe("juz-gotowe");
  });

  it("zachowuje cyfry", () => {
    expect(slugify("Top 10 książek")).toBe("top-10-ksiazek");
  });
});
