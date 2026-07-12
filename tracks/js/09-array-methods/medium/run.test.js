import { describe, it, expect } from "vitest";
import { filterRange, sortByAge, unique, groupById } from "./starter.js";

describe("filterRange", () => {
  it("zwraca elementy z przedziału [a, b] włącznie", () => {
    expect(filterRange([5, 3, 8, 1], 1, 4)).toEqual([3, 1]);
    expect(filterRange([5, 3, 8, 1], 3, 5)).toEqual([5, 3]);
  });

  it("nie mutuje tablicy wejściowej", () => {
    const input = [5, 3, 8, 1];
    filterRange(input, 1, 4);
    expect(input, "funkcja zmieniła tablicę wejściową — filter zwraca nową tablicę, użyj jego").toEqual([5, 3, 8, 1]);
  });
});

describe("sortByAge", () => {
  const users = [
    { name: "John", age: 25 },
    { name: "Pete", age: 30 },
    { name: "Mary", age: 28 },
  ];

  it("sortuje rosnąco po age", () => {
    expect(sortByAge(users).map((u) => u.name)).toEqual(["John", "Mary", "Pete"]);
  });

  it("nie mutuje tablicy wejściowej", () => {
    const input = [
      { name: "Pete", age: 30 },
      { name: "John", age: 25 },
    ];
    sortByAge(input);
    expect(
      input.map((u) => u.name),
      "sort() sortuje W MIEJSCU — posortuj kopię ([...users]) albo użyj toSorted()",
    ).toEqual(["Pete", "John"]);
  });
});

describe("unique", () => {
  it("usuwa duplikaty, zachowując kolejność pierwszych wystąpień", () => {
    expect(unique(["Hare", "Krishna", "Hare", "Krishna", ":-O"])).toEqual(["Hare", "Krishna", ":-O"]);
    expect(unique([1, 1, 1])).toEqual([1]);
    expect(unique([])).toEqual([]);
  });

  it("nie mutuje tablicy wejściowej", () => {
    const input = [1, 1, 2];
    unique(input);
    expect(input).toEqual([1, 1, 2]);
  });
});

describe("groupById", () => {
  it("buduje obiekt z kluczami id", () => {
    const users = [
      { id: "john", name: "John Smith", age: 20 },
      { id: "ann", name: "Ann Smith", age: 24 },
    ];
    expect(groupById(users)).toEqual({
      john: { id: "john", name: "John Smith", age: 20 },
      ann: { id: "ann", name: "Ann Smith", age: 24 },
    });
  });

  it("pusta tablica daje pusty obiekt", () => {
    expect(groupById([]), "reduce z initialValue {} obsłuży pustą tablicę bez błędu").toEqual({});
  });
});
