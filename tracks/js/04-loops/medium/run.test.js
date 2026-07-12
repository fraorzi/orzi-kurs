import { describe, it, expect } from "vitest";
import { primesUpTo, chessboard, firstIndexWhere } from "./starter.js";

describe("primesUpTo", () => {
  it("zwraca liczby pierwsze do n włącznie", () => {
    expect(primesUpTo(10)).toEqual([2, 3, 5, 7]);
    expect(primesUpTo(11), "granica n jest WŁĄCZNIE — 11 jest pierwsze i musi wejść").toEqual([2, 3, 5, 7, 11]);
  });

  it("przypadki brzegowe: 1 i 2", () => {
    expect(primesUpTo(1), "najmniejsza liczba pierwsza to 2 — dla n=1 wynik jest pusty").toEqual([]);
    expect(primesUpTo(2)).toEqual([2]);
  });
});

describe("chessboard", () => {
  it("generuje szachownicę 2x2", () => {
    expect(
      chessboard(2),
      "lewy górny róg to spacja; pola, gdzie (wiersz+kolumna) jest parzyste, to spacje, nieparzyste — #",
    ).toBe(" #\n# \n");
  });

  it("generuje szachownicę 4x4 z \\n po każdym wierszu", () => {
    expect(chessboard(4)).toBe(" # #\n# # \n # #\n# # \n");
  });

  it("każdy wiersz ma długość size i kończy się \\n", () => {
    const rows = chessboard(5).split("\n");
    expect(rows.at(-1), "string ma się kończyć znakiem nowej linii — po splicie ostatni element jest pusty").toBe("");
    expect(rows.slice(0, -1).every((row) => row.length === 5)).toBe(true);
  });
});

describe("firstIndexWhere", () => {
  it("zwraca indeks pierwszego pasującego elementu", () => {
    expect(firstIndexWhere([5, 12, 8, 130], (x) => x > 10)).toBe(1);
  });

  it("zwraca -1, gdy nic nie pasuje", () => {
    expect(firstIndexWhere([1, 2, 3], (x) => x > 100)).toBe(-1);
    expect(firstIndexWhere([], () => true)).toBe(-1);
  });

  it("przerywa iterację po znalezieniu — pred nie jest wołany dalej", () => {
    const seen = [];
    firstIndexWhere([1, 5, 2, 9], (x) => {
      seen.push(x);
      return x === 5;
    });
    expect(
      seen,
      "po znalezieniu elementu pętla ma się zatrzymać (break/return) — dalsze wywołania pred to zbędna praca",
    ).toEqual([1, 5]);
  });

  it("pred dostaje element i indeks", () => {
    const pairs = [];
    firstIndexWhere(["a", "b"], (el, i) => {
      pairs.push([el, i]);
      return false;
    });
    expect(pairs).toEqual([["a", 0], ["b", 1]]);
  });
});
