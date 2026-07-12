import { describe, it, expect } from "vitest";
import { expectScaling } from "@harness/bench";
import { namesByIds } from "./starter.js";

describe("namesByIds — poprawność", () => {
  it("zwraca nazwy w kolejności podanych ids", () => {
    const users = [
      { id: 1, name: "Ala" },
      { id: 2, name: "Jan" },
    ];
    expect(namesByIds(users, [2, 1, 2])).toEqual(["Jan", "Ala", "Jan"]);
  });

  it("dla pustych ids zwraca pustą tablicę", () => {
    expect(namesByIds([{ id: 1, name: "Ala" }], [])).toEqual([]);
  });
});

describe("namesByIds — złożoność", () => {
  it("działa w czasie liniowym, nie kwadratowym", () => {
    expectScaling({
      fn: ({ users, ids }) => namesByIds(users, ids),
      makeInput: (n) => ({
        users: Array.from({ length: n }, (_, i) => ({ id: i, name: `u${i}` })),
        ids: Array.from({ length: n }, (_, i) => i),
      }),
      sizes: [2000, 20000],
      expect: "linear",
    });
  });
});
