import { describe, it, expect } from "vitest";
import { expectScaling } from "@harness/bench";
import { uniqueByEmail } from "./starter.js";

describe("uniqueByEmail — poprawność", () => {
  it("zostawia pierwsze wystąpienie każdego e-maila, w kolejności", () => {
    expect(
      uniqueByEmail([
        { email: "a@x.pl", name: "Ala" },
        { email: "b@x.pl", name: "Bob" },
        { email: "a@x.pl", name: "Ala2" },
      ]),
      "przy powtórzonym e-mailu zostaje PIERWSZY obiekt (Ala), nie ostatni",
    ).toEqual([
      { email: "a@x.pl", name: "Ala" },
      { email: "b@x.pl", name: "Bob" },
    ]);
  });

  it("bez duplikatów zwraca wszystkich", () => {
    const users = [{ email: "a" }, { email: "b" }];
    expect(uniqueByEmail(users)).toEqual(users);
  });

  it("dla pustej listy zwraca pustą tablicę", () => {
    expect(uniqueByEmail([])).toEqual([]);
  });
});

describe("uniqueByEmail — złożoność", () => {
  it("działa w czasie liniowym, nie kwadratowym", () => {
    expectScaling({
      fn: (users) => uniqueByEmail(users),
      makeInput: (n) => Array.from({ length: n }, (_, i) => ({ email: `e${i}` })),
      sizes: [2000, 20000],
      expect: "linear",
    });
  });
});
