import { describe, it, expect } from "vitest";
import { updateField, addItem } from "./starter.js";

describe("updateField", () => {
  it("zwraca nowy obiekt z nadpisanym polem", () => {
    expect(updateField({ name: "Ala", age: 30 }, "age", 31)).toEqual({ name: "Ala", age: 31 });
  });

  it("nie mutuje oryginału i zwraca inną referencję", () => {
    const user = { name: "Ala", age: 30 };
    const next = updateField(user, "age", 31);
    expect(user.age, "oryginał ma zostać nietknięty — kopiuj przez spread").toBe(30);
    expect(next, "wynik ma być NOWYM obiektem, nie tym samym co wejście").not.toBe(user);
  });

  it("dodaje nowe pole, gdy klucza nie było", () => {
    expect(updateField({ a: 1 }, "b", 2)).toEqual({ a: 1, b: 2 });
  });
});

describe("addItem", () => {
  it("zwraca nową tablicę z dopisanym elementem", () => {
    expect(addItem([1, 2], 3)).toEqual([1, 2, 3]);
  });

  it("nie mutuje oryginału i zwraca inną referencję", () => {
    const items = [1, 2];
    const next = addItem(items, 3);
    expect(items, "oryginalna tablica ma zostać bez zmian — żadnego push").toEqual([1, 2]);
    expect(next).not.toBe(items);
  });
});
