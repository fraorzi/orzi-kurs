import { describe, it, expect } from "vitest";
import { firstAndLast, swapped, fullName } from "./starter.js";

describe("firstAndLast", () => {
  it("zwraca pierwszy i ostatni element", () => {
    expect(firstAndLast([1, 2, 3])).toEqual({ first: 1, last: 3 });
    expect(firstAndLast(["a", "b"])).toEqual({ first: "a", last: "b" });
  });

  it("dla tablicy jednoelementowej first i last to ten sam element", () => {
    expect(firstAndLast(["solo"])).toEqual({ first: "solo", last: "solo" });
  });
});

describe("swapped", () => {
  it("zwraca parę w odwrotnej kolejności", () => {
    expect(swapped([1, 2])).toEqual([2, 1]);
  });

  it("nie mutuje wejścia", () => {
    const pair = [1, 2];
    swapped(pair);
    expect(pair, "masz zwrócić NOWĄ parę — wejściowa tablica bez zmian").toEqual([1, 2]);
  });
});

describe("fullName", () => {
  it("skleja first i last", () => {
    expect(fullName({ first: "Jan", last: "Kowalski" })).toBe("Jan Kowalski");
  });

  it("bez last zwraca samo first — bez spacji i 'undefined'", () => {
    expect(
      fullName({ first: "Prince" }),
      "brak last to undefined — nie może wyciec do wyniku jako 'Prince undefined' ani 'Prince '",
    ).toBe("Prince");
  });
});
