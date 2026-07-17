import { describe, it, expect } from "vitest";
import { expectScaling } from "@harness/bench";
import { removeAll } from "./starter.js";

describe("removeAll — poprawność", () => {
  it("usuwa wszystkie wskazane wartości, zachowując kolejność", () => {
    expect(removeAll([1, 2, 3, 2, 4], [2, 4])).toEqual([1, 3]);
  });

  it("pusta lista usuwanych zostawia tablicę bez zmian (co do zawartości)", () => {
    expect(removeAll([1, 2, 3], [])).toEqual([1, 2, 3]);
  });

  it("nie mutuje wejścia", () => {
    const arr = [1, 2, 3];
    removeAll(arr, [2]);
    expect(arr, "filter zwraca nową tablicę — oryginał zostaje").toEqual([1, 2, 3]);
  });

  it("na pustej tablicy zwraca pustą", () => {
    expect(removeAll([], [1])).toEqual([]);
  });
});

describe("removeAll — złożoność", () => {
  it("[quality] działa liniowo, nie zależnie od (liczba usuwanych × długość)", () => {
    expectScaling({
      fn: ({ arr, toRemove }) => removeAll(arr, toRemove),
      makeInput: (n) => ({
        arr: Array.from({ length: n }, (_, i) => i),
        toRemove: Array.from({ length: Math.floor(n / 20) }, (_, i) => i * 20),
      }),
      sizes: [2000, 20000],
      expect: "linear",
    });
  });
});
