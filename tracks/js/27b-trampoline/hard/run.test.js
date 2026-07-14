import { describe, it, expect } from "vitest";
import { flattenDeep } from "./starter.js";

describe("flattenDeep — poprawność", () => {
  it("spłaszcza zagnieżdżone tablice zachowując kolejność", () => {
    expect(flattenDeep([1, [2, [3, [4]]], 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("dla pustej tablicy zwraca pustą", () => {
    expect(flattenDeep([])).toEqual([]);
  });

  it("pomija puste pod-tablice", () => {
    expect(flattenDeep([[], [1], [[2]]])).toEqual([1, 2]);
  });

  it("zachowuje kolejność przy mieszanych poziomach", () => {
    expect(flattenDeep([1, [2, 3], [[4], 5], 6])).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

describe("flattenDeep — głębokość", () => {
  it("radzi sobie z bardzo głębokim zagnieżdżeniem (rekurencja by przepełniła stos)", () => {
    let deep = 0;
    for (let i = 0; i < 50000; i++) deep = [deep];
    const result = flattenDeep(deep);
    expect(
      result,
      "50 000 poziomów zagnieżdżenia — wersja iteracyjna (jawny stos) przechodzi, rekurencyjna rzuca RangeError",
    ).toEqual([0]);
  });
});
