import { describe, it, expect } from "vitest";
import { firstN, firstEvens } from "./starter.js";

function* naturals() {
  let i = 1;
  while (true) yield i++;
}

describe("firstN", () => {
  it("zwraca pierwsze n elementów tablicy", () => {
    expect(firstN([10, 20, 30, 40], 2)).toEqual([10, 20]);
  });

  it("działa na dowolnym iterable (Set)", () => {
    expect(firstN(new Set([1, 2, 3]), 5)).toEqual([1, 2, 3]);
  });

  it("działa na nieskończonym generatorze dzięki take (nie zawiesza się)", () => {
    expect(
      firstN(naturals(), 3),
      "take(n) na iteratorze pobiera tylko n elementów — nawet ze źródła nieskończonego",
    ).toEqual([1, 2, 3]);
  });
});

describe("firstEvens", () => {
  it("zwraca pierwsze n liczb parzystych", () => {
    expect(firstEvens([1, 2, 3, 4, 5, 6], 2)).toEqual([2, 4]);
  });

  it("filtruje leniwie na nieskończonym generatorze", () => {
    expect(firstEvens(naturals(), 3)).toEqual([2, 4, 6]);
  });
});
