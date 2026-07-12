import { describe, it, expect } from "vitest";
import { range, take } from "./starter.js";

describe("range", () => {
  it("wydaje liczby od start do end włącznie", () => {
    expect([...range(1, 4)], "generator ma yieldować 1,2,3,4 — zakres domknięty").toEqual([
      1, 2, 3, 4,
    ]);
    expect([...range(5, 5)]).toEqual([5]);
  });

  it("zwraca pusty ciąg, gdy start > end", () => {
    expect([...range(3, 1)]).toEqual([]);
  });

  it("jest wielokrotnie wywoływalny (każde range() to nowy generator)", () => {
    expect([...range(1, 2)]).toEqual([1, 2]);
    expect([...range(1, 2)]).toEqual([1, 2]);
  });
});

describe("take", () => {
  it("wydaje pierwsze n elementów iterable", () => {
    expect([...take([10, 20, 30], 2)]).toEqual([10, 20]);
    expect([...take("abcdef", 3)]).toEqual(["a", "b", "c"]);
  });

  it("gdy iterable krótszy niż n, wydaje wszystko", () => {
    expect([...take([1, 2], 5)]).toEqual([1, 2]);
  });

  it("dla n = 0 nie wydaje nic", () => {
    expect([...take([1, 2, 3], 0)]).toEqual([]);
  });

  it("jest leniwe — pobiera dokładnie n elementów źródła, nie więcej", () => {
    let produced = 0;
    function* source() {
      while (true) {
        produced += 1;
        yield produced;
      }
    }
    const result = [...take(source(), 3)];
    expect(result).toEqual([1, 2, 3]);
    expect(
      produced,
      "take ma przerwać (return) zaraz po n-tym yieldzie — inaczej pobierze n+1 element z nieskończonego źródła",
    ).toBe(3);
  });
});
