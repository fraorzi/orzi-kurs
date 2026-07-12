import { describe, it, expect } from "vitest";
import {
  getItem,
  setItem,
  insertItemAtTop,
  removeItem,
  removeItemFromTop,
  checkSizeOfStack,
} from "./starter.js";

describe("talia kart", () => {
  it("getItem zwraca kartę ze wskazanej pozycji", () => {
    expect(getItem([1, 2, 4, 1], 2)).toBe(4);
    expect(getItem([7], 0)).toBe(7);
  });

  it("setItem podmienia kartę na wskazanej pozycji", () => {
    expect(setItem([1, 2, 4, 1], 2, 6)).toEqual([1, 2, 6, 1]);
  });

  it("insertItemAtTop dokłada kartę na koniec talii", () => {
    expect(insertItemAtTop([5, 9, 7], 8)).toEqual([5, 9, 7, 8]);
  });

  it("removeItem usuwa kartę ze środka talii", () => {
    expect(removeItem([3, 2, 6, 4], 2), "użyj splice — usuwa elementy pod wskazanym indeksem").toEqual([3, 2, 4]);
    expect(removeItem([3, 2, 6, 4], 0)).toEqual([2, 6, 4]);
  });

  it("removeItemFromTop zdejmuje ostatnią kartę", () => {
    expect(removeItemFromTop([3, 2, 6, 4])).toEqual([3, 2, 6]);
  });

  it("checkSizeOfStack sprawdza liczbę kart", () => {
    expect(checkSizeOfStack([3, 2, 6], 3)).toBe(true);
    expect(checkSizeOfStack([3, 2, 6], 2)).toBe(false);
  });
});
