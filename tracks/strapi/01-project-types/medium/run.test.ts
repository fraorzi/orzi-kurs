import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("wyprowadzanie publicznego kontraktu pól", () => {
  it("wyklucza pola prywatne i hasła, zwraca resztę posortowaną", () => {
    expect(
      solve({
        title: { type: "string" },
        secret: { type: "string", private: true },
        password: { type: "password" },
      }),
    ).toEqual(["title"]);
  });

  it("traktuje brak klucza private jako pole publiczne", () => {
    expect(solve({ slug: { type: "string" } })).toEqual(["slug"]);
  });

  it("nie robi wyjątku dla innych typów pól niż string", () => {
    expect(
      solve({
        body: { type: "richtext" },
        author: { type: "relation" },
        status: { type: "enumeration" },
      }),
    ).toEqual(["author", "body", "status"]);
  });

  it("sortuje wynik alfabetycznie niezależnie od kolejności deklaracji", () => {
    expect(
      solve({
        zeta: { type: "string" },
        alpha: { type: "string" },
      }),
    ).toEqual(["alpha", "zeta"]);
  });

  it("zwraca pustą listę, gdy schemat nie ma pól publicznych", () => {
    expect(
      solve({
        password: { type: "password" },
        secret: { type: "string", private: true },
      }),
    ).toEqual([]);
  });
});
