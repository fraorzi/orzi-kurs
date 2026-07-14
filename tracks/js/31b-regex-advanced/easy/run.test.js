import { describe, it, expect } from "vitest";
import { extractPrices, extractMentions } from "./starter.js";

describe("extractPrices", () => {
  it("wyciąga liczby po $ (bez samego $)", () => {
    expect(
      extractPrices("buy $30 or $9.99, not 50"),
      "lookbehind wymaga $ przed liczbą, ale go nie zwraca; 50 bez $ pomijamy",
    ).toEqual([30, 9.99]);
  });

  it("gdy nie ma cen, zwraca pustą tablicę", () => {
    expect(extractPrices("brak cen")).toEqual([]);
  });

  it("zwraca liczby, nie stringi", () => {
    expect(extractPrices("$7")).toEqual([7]);
  });
});

describe("extractMentions", () => {
  it("wyciąga nazwy po @ (bez @)", () => {
    expect(extractMentions("hi @ala and @ola_99!")).toEqual(["ala", "ola_99"]);
  });

  it("email nie generuje fałszywej wzmianki po lokalnej części", () => {
    expect(
      extractMentions("pisz do a@ola"),
      "@ola jest poprzedzone literą — lookbehind (?<=@) i tak łapie 'ola' po @",
    ).toEqual(["ola"]);
  });
});
