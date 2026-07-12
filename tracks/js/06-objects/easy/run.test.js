import { describe, it, expect } from "vitest";
import { countProps, sumSalaries, renameKey } from "./starter.js";

describe("countProps", () => {
  it("liczy własne właściwości", () => {
    expect(countProps({ a: 1, b: 2 })).toBe(2);
    expect(countProps({})).toBe(0);
  });
});

describe("sumSalaries", () => {
  it("sumuje wartości obiektu", () => {
    expect(sumSalaries({ John: 100, Ann: 160, Pete: 130 })).toBe(390);
  });

  it("pusty obiekt daje 0", () => {
    expect(sumSalaries({}), "reduce/pętla musi startować z 0, żeby pusty obiekt nie dał undefined/NaN").toBe(0);
  });
});

describe("renameKey", () => {
  it("przemianowuje klucz, zachowując wartość i resztę obiektu", () => {
    expect(renameKey({ name: "Ala", age: 30 }, "name", "fullName")).toEqual({
      fullName: "Ala",
      age: 30,
    });
  });

  it("nie mutuje wejścia", () => {
    const input = { name: "Ala" };
    renameKey(input, "name", "fullName");
    expect(
      input,
      "masz zbudować NOWY obiekt — wejściowy musi zostać nietknięty (bez delete!)",
    ).toEqual({ name: "Ala" });
  });

  it("brak klucza from daje kopię obiektu", () => {
    const input = { a: 1 };
    const result = renameKey(input, "x", "y");
    expect(result).toEqual({ a: 1 });
    expect(result, "wynik ma być kopią, nie tą samą referencją").not.toBe(input);
  });
});
