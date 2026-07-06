import { describe, it, expect } from "vitest";
import { sumEvens } from "./starter.js";

describe("sumEvens", () => {
  it("sumuje liczby parzyste z tablicy", () => {
    expect(sumEvens([1, 2, 3, 4]), "suma parzystych z [1,2,3,4] to 2+4=6").toBe(
      6,
    );
    expect(sumEvens([-2, -1, 0, 5]), "parzyste to -2 i 0, suma = -2").toBe(-2);
  });

  it("zwraca 0 gdy brak liczb parzystych lub tablica pusta", () => {
    expect(sumEvens([1, 3, 5]), "brak parzystych → 0").toBe(0);
    expect(sumEvens([]), "pusta tablica → 0").toBe(0);
  });

  it("nie mutuje tablicy wejściowej", () => {
    const input = [2, 4, 6];
    const copy = [...input];
    sumEvens(input);
    expect(input, "funkcja zmodyfikowała tablicę wejściową").toEqual(copy);
  });
});
