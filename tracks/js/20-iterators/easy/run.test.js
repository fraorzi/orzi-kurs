import { describe, it, expect } from "vitest";
import { range, toArray } from "./starter.js";

describe("range", () => {
  it("wydaje liczby od start do end włącznie (spread)", () => {
    expect([...range(1, 4)], "range ma być domknięty z obu stron: 1,2,3,4").toEqual([1, 2, 3, 4]);
    expect([...range(5, 5)]).toEqual([5]);
  });

  it("działa z for..of i Array.from", () => {
    const collected = [];
    for (const n of range(1, 3)) collected.push(n);
    expect(collected).toEqual([1, 2, 3]);
    expect(Array.from(range(1, 3))).toEqual([1, 2, 3]);
  });

  it("zwraca puste, gdy start > end", () => {
    expect([...range(3, 1)], "przy start > end iterator ma od razu zgłosić done: true").toEqual([]);
  });

  it("iteracja jest powtarzalna (stan w iteratorze, nie w obiekcie)", () => {
    const r = range(1, 3);
    const first = [...r];
    const second = [...r];
    expect(
      second,
      "drugie przejście dało inny wynik — stan (current) trzymaj w iteratorze zwracanym przez [Symbol.iterator], nie w obiekcie range",
    ).toEqual(first);
  });
});

describe("toArray", () => {
  it("zbiera elementy Set, stringu i range", () => {
    expect(toArray(new Set([1, 2, 3]))).toEqual([1, 2, 3]);
    expect(toArray("abc"), "string jest iterable — for..of wydaje kolejne znaki").toEqual([
      "a",
      "b",
      "c",
    ]);
    expect(toArray(range(1, 3))).toEqual([1, 2, 3]);
  });

  it("dla pustego iterable zwraca pustą tablicę", () => {
    expect(toArray([])).toEqual([]);
  });
});
