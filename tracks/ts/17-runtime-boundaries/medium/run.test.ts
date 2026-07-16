import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  parseArray,
  parsePositiveInteger,
  type ParseResult,
} from "./starter";

describe("parseArray", () => {
  it("zachowuje typ i kolejność", () => {
    const result = parseArray([1, 2, 3], parsePositiveInteger);
    type _result = Expect<Equal<typeof result, ParseResult<number[]>>>;
    expect(result).toEqual({ ok: true, value: [1, 2, 3] });
  });

  it("zbiera wszystkie błędy z indeksami", () => {
    expect(parseArray([1, 0, "2", -1], parsePositiveInteger)).toEqual({
      ok: false,
      errors: [
        "[1]: expected positive integer",
        "[2]: expected positive integer",
        "[3]: expected positive integer",
      ],
    });
  });

  it("odrzuca wartość niebędącą tablicą", () => {
    expect(parseArray({}, parsePositiveInteger)).toEqual({
      ok: false,
      errors: ["expected array"],
    });
  });

  it("działa z innym parserem", () => {
    const parseString = (value: unknown): ParseResult<string> =>
      typeof value === "string"
        ? { ok: true, value }
        : { ok: false, errors: ["expected string"] };
    expect(parseArray(["a", "b"], parseString)).toEqual({
      ok: true,
      value: ["a", "b"],
    });
  });
});
