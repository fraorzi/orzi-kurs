import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  parseRange,
  rangeLength,
  type ParseRangeResult,
  type Range,
} from "./starter";

describe("typy krotek", () => {
  it("Range ma dokładnie dwie readonly pozycje", () => {
    type _range = Expect<Equal<Range, readonly [start: number, end: number]>>;
    const range: Range = [1, 2] as const;
    expect(rangeLength(range)).toBe(2);
  });

  it("wynik zawęża drugą pozycję przez pierwszą", () => {
    const result: ParseRangeResult = parseRange("1..3");
    if (result[0]) {
      type _success = Expect<Equal<typeof result[1], Range>>;
      expect(result[1]).toEqual([1, 3]);
    } else {
      type _failure = Expect<Equal<typeof result[1], string>>;
      expect(result[1]).toBeTypeOf("string");
    }
  });
});

describe("parseRange", () => {
  it("parsuje poprawny zakres", () => {
    expect(parseRange("10..20")).toEqual([true, [10, 20]]);
  });

  it.each([
    ["10-20", "format"],
    ["1.5..2", "integer"],
    ["20..10", "order"],
  ])("odrzuca %s", (input, message) => {
    expect(parseRange(input)).toEqual([false, message]);
  });

  it("liczy długość włącznie", () => {
    expect(rangeLength([10, 10])).toBe(1);
    expect(rangeLength([-2, 2])).toBe(5);
  });
});
