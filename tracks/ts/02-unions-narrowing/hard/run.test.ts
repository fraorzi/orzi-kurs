import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import type { Equal, Expect } from "@harness/type-assert";
import {
  isRecord,
  parseUser,
  userLabel,
  type ParseResult,
  type User,
} from "./starter";

type Ok = Extract<ParseResult, { ok: true }>;
type Err = Extract<ParseResult, { ok: false }>;

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("ParseResult jest unią rozłączną: sukces albo błędy, nigdy oba", () => {
    type _ok = Expect<Equal<Ok, { ok: true; user: User }>>;
    type _err = Expect<Equal<Err, { ok: false; errors: string[] }>>;
    expect(parseUser({ id: 1, name: "Ala" }).ok).toBe(true);
  });

  it("bez zawężenia po ok pole user nie istnieje", () => {
    const result = parseUser({ id: 1, name: "Ala" });
    // @ts-expect-error dopóki nie sprawdzisz result.ok, wariantu z user nie ma
    result.user;
    if (result.ok) {
      expect(result.user.name).toBe("Ala");
    }
  });

  it("isRecord zawęża unknown do Record<string, unknown>", () => {
    const value: unknown = { a: 1 };
    if (isRecord(value)) {
      // bez predykatu `value is Record<string, unknown>` value zostaje unknown
      const record: Record<string, unknown> = value;
      expect(record.a).toBe(1);
    }
    expect(isRecord(value)).toBe(true);
  });
});

describe("isRecord", () => {
  it("prawda dla zwykłego obiektu", () => {
    expect(isRecord({ a: 1 })).toBe(true);
  });

  it("fałsz dla null", () => {
    expect(
      isRecord(null),
      "typeof null === \"object\" — null trzeba wykluczyć osobno",
    ).toBe(false);
  });

  it("fałsz dla tablicy", () => {
    expect(
      isRecord([1, 2]),
      "tablica to też obiekt — wyklucz ją przez Array.isArray",
    ).toBe(false);
  });

  it("fałsz dla prymitywów", () => {
    expect(isRecord("abc")).toBe(false);
    expect(isRecord(7)).toBe(false);
    expect(isRecord(undefined)).toBe(false);
  });
});

describe("parseUser", () => {
  it("przepuszcza poprawnego użytkownika", () => {
    expect(parseUser({ id: 1, name: "Ala", email: "ala@example.com" })).toEqual({
      ok: true,
      user: { id: 1, name: "Ala", email: "ala@example.com" },
    });
  });

  it("brak emaila jest poprawny i daje null", () => {
    expect(parseUser({ id: 7, name: "Ola" })).toEqual({
      ok: true,
      user: { id: 7, name: "Ola", email: null },
    });
  });

  it("dane niebędące obiektem dają jeden błąd", () => {
    expect(parseUser("nope")).toEqual({
      ok: false,
      errors: ["dane nie są obiektem"],
    });
    expect(parseUser(null)).toEqual({
      ok: false,
      errors: ["dane nie są obiektem"],
    });
  });

  it("zbiera wszystkie błędy pól, nie tylko pierwszy", () => {
    expect(
      parseUser({ id: 1.5, name: "" }),
      "walidacja ma raportować komplet problemów — inaczej użytkownik poprawia je po jednym",
    ).toEqual({
      ok: false,
      errors: [
        "id musi być liczbą całkowitą",
        "name musi być niepustym tekstem",
      ],
    });
  });

  it("odrzuca id, które nie jest liczbą całkowitą", () => {
    expect(parseUser({ id: "1", name: "Ala" })).toEqual({
      ok: false,
      errors: ["id musi być liczbą całkowitą"],
    });
  });

  it("odrzuca email o złym typie", () => {
    expect(parseUser({ id: 1, name: "Ala", email: 42 })).toEqual({
      ok: false,
      errors: ["email musi być tekstem albo null"],
    });
  });

  it("jawny null w email jest poprawny", () => {
    expect(parseUser({ id: 1, name: "Ala", email: null })).toEqual({
      ok: true,
      user: { id: 1, name: "Ala", email: null },
    });
  });
});

describe("userLabel", () => {
  it("dla sukcesu zwraca nazwę i id", () => {
    expect(
      userLabel({ ok: true, user: { id: 1, name: "Ala", email: null } }),
    ).toBe("Ala (#1)");
  });

  it("dla porażki wypisuje błędy po przecinku", () => {
    expect(userLabel({ ok: false, errors: ["a", "b"] })).toBe("błędy: a, b");
  });
});

describe("ograniczenia zadania", () => {
  it("starter nie używa as, any ani non-null assertion", () => {
    const source = readFileSync(new URL("./starter.ts", import.meta.url), "utf8");
    const stripped = source.replace(/\/\/.*$/gm, "");
    expect(
      /\bas\s+(?!const\b)[A-Za-z{[]/.test(stripped),
      "rzutowanie `as` omija kontrolę typów — tu chodzi o dowodzenie zawężaniem",
    ).toBe(false);
    expect(
      /\bany\b/.test(stripped),
      "`any` wyłącza kontrolę typów w całym łańcuchu wyrażeń — użyj `unknown` i zawężaj",
    ).toBe(false);
  });
});
