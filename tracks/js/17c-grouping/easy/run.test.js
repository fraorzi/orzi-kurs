import { describe, it, expect } from "vitest";
import { groupByFirstLetter } from "./starter.js";

// Object.groupBy zwraca obiekt null-prototype — spreadujemy do zwykłego obiektu,
// żeby porównać treść niezależnie od prototypu.
const plain = (obj) => ({ ...obj });

describe("groupByFirstLetter", () => {
  it("grupuje słowa wg pierwszej litery, zachowując kolejność wejścia", () => {
    expect(plain(groupByFirstLetter(["apple", "avocado", "banana", "cherry"]))).toEqual({
      a: ["apple", "avocado"],
      b: ["banana"],
      c: ["cherry"],
    });
  });

  it("dla pustej listy zwraca pusty obiekt", () => {
    expect(plain(groupByFirstLetter([]))).toEqual({});
  });

  it("wszystkie słowa na tę samą literę trafiają do jednej grupy", () => {
    expect(
      plain(groupByFirstLetter(["dog", "duck", "deer"])),
      "każde słowo na 'd' ma trafić do grupy 'd'",
    ).toEqual({ d: ["dog", "duck", "deer"] });
  });
});
