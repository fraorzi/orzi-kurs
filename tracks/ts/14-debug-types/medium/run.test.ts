import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { parseJson, type ParseResult } from "./starter";

type User = { id: number; name: string };

function parseUser(value: unknown): User {
  if (
    typeof value !== "object" ||
    value === null ||
    !("id" in value) ||
    typeof value.id !== "number" ||
    !("name" in value) ||
    typeof value.name !== "string"
  ) {
    throw new TypeError("invalid user");
  }
  return { id: value.id, name: value.name };
}

describe("parseJson", () => {
  it("typ wyniku pochodzi z parsera, nie z ręcznego parametru", () => {
    const result = parseJson('{"id":1,"name":"Ala"}', parseUser);
    type _result = Expect<Equal<typeof result, ParseResult<User>>>;
    expect(result).toEqual({ ok: true, value: { id: 1, name: "Ala" } });
  });

  it("odróżnia składnię JSON od złej wartości", () => {
    expect(parseJson("{", parseUser)).toEqual({
      ok: false,
      message: "invalid json",
    });
    expect(parseJson('{"id":"1"}', parseUser)).toEqual({
      ok: false,
      message: "invalid user",
    });
  });

  it("normalizuje nie-Error rzucony przez parser", () => {
    expect(
      parseJson("null", () => {
        throw "nope";
      }),
    ).toEqual({ ok: false, message: "invalid value" });
  });
});
