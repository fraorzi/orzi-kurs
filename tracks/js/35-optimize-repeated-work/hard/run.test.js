import { describe, it, expect } from "vitest";
import { expectScaling } from "@harness/bench";
import { firstUnique } from "./starter.js";

describe("firstUnique — poprawność", () => {
  it("zwraca pierwszą wartość występującą dokładnie raz", () => {
    expect(firstUnique([1, 2, 2, 3, 3])).toBe(1);
    expect(firstUnique([2, 2, 1, 3, 3]), "kolejność liczy się od lewej").toBe(1);
  });

  it("zwraca undefined, gdy nie ma unikatu", () => {
    expect(firstUnique([1, 1, 2, 2])).toBe(undefined);
    expect(firstUnique([])).toBe(undefined);
  });
});

describe("firstUnique — złożoność", () => {
  it("[quality] działa w czasie liniowym, nie kwadratowym", () => {
    expectScaling({
      fn: (arr) => firstUnique(arr),
      makeInput: (n) => {
        const arr = [];
        for (let i = 0; i < Math.floor(n / 2); i++) {
          arr.push(i, i); // każda wartość dwa razy...
        }
        arr.push(-1); // ...poza jednym unikatem na końcu (wymusza pełne skanowanie)
        return arr;
      },
      sizes: [2000, 20000],
      expect: "linear",
    });
  });
});
