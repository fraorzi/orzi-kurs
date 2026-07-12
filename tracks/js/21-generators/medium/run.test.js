import { describe, it, expect } from "vitest";
import { flatten, chain } from "./starter.js";

describe("flatten", () => {
  it("spłaszcza głęboko zagnieżdżone tablice", () => {
    expect(
      [...flatten([1, [2, [3, [4]]]])],
      "wejście w podtablicę realizuj przez yield* flatten(element) — rekurencyjna delegacja",
    ).toEqual([1, 2, 3, 4]);
  });

  it("radzi sobie z pustymi podtablicami i płaskim wejściem", () => {
    expect([...flatten([[1], [], [2, 3]])]).toEqual([1, 2, 3]);
    expect([...flatten([1, 2, 3])]).toEqual([1, 2, 3]);
    expect([...flatten([])]).toEqual([]);
  });

  it("zachowuje kolejność w głąb (pre-order)", () => {
    expect([...flatten([1, [2, 3], 4])]).toEqual([1, 2, 3, 4]);
  });
});

describe("chain", () => {
  it("łączy kilka iterables po kolei", () => {
    expect([...chain([1, 2], [3], [4, 5])]).toEqual([1, 2, 3, 4, 5]);
  });

  it("działa na różnych typach iterables (string, Set)", () => {
    expect(
      [...chain("ab", new Set([1, 2]))],
      "yield* działa na każdym iterable, nie tylko na tablicach",
    ).toEqual(["a", "b", 1, 2]);
  });

  it("bez argumentów daje pustą sekwencję", () => {
    expect([...chain()]).toEqual([]);
  });
});
