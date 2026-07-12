import { describe, it, expect } from "vitest";
import { average } from "./src/index.js";

describe("average", () => {
  it("zwraca średnią arytmetyczną liczb", () => {
    expect(average([2, 4, 6]), "średnia z [2,4,6] to 12/3 = 4").toBe(4);
    expect(average([10]), "średnia z [10] to 10").toBe(10);
  });

  it("zwraca 0 dla pustej tablicy", () => {
    expect(average([]), "pusta tablica → 0 (bez dzielenia przez zero)").toBe(0);
  });

  it("nie mutuje tablicy wejściowej", () => {
    const input = [1, 2, 3];
    const copy = [...input];
    average(input);
    expect(input, "funkcja zmodyfikowała tablicę wejściową").toEqual(copy);
  });
});
