import { describe, it, expect } from "vitest";
import { common, combined } from "./starter.js";

describe("common", () => {
  it("zwraca elementy obecne w obu tablicach, posortowane", () => {
    expect(common([1, 2, 3, 4], [3, 4, 5])).toEqual([3, 4]);
  });

  it("bez wspólnych elementów zwraca pustą tablicę", () => {
    expect(common([1, 2], [9])).toEqual([]);
  });

  it("gubi duplikaty (wynik to zbiór)", () => {
    expect(
      common([1, 1, 2, 2], [2, 2]),
      "Set usuwa duplikaty — część wspólna {1,1,2,2} i {2,2} to {2}",
    ).toEqual([2]);
  });
});

describe("combined", () => {
  it("zwraca wszystkie unikalne elementy z obu tablic, posortowane", () => {
    expect(combined([1, 2, 3], [3, 4])).toEqual([1, 2, 3, 4]);
  });

  it("usuwa duplikaty w obrębie i między tablicami", () => {
    expect(combined([1, 1, 2], [2, 3])).toEqual([1, 2, 3]);
  });
});
