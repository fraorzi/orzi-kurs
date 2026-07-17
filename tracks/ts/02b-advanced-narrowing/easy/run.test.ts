import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { compact, isPresent, isString } from "./starter";

describe("predykaty", () => {
  it("compact zachowuje typ elementu", () => {
    const result = compact([1, null, 2, undefined]);
    type _result = Expect<Equal<typeof result, number[]>>;
    expect(result).toEqual([1, 2]);
  });

  it("nie usuwa poprawnych wartości falsy", () => {
    expect(compact([0, false, "", null, undefined])).toEqual([0, false, ""]);
  });

  it("isPresent zawęża wartość", () => {
    const value: string | null = "tekst";
    if (isPresent(value)) {
      type _value = Expect<Equal<typeof value, string>>;
      expect(value.toUpperCase()).toBe("TEKST");
    }
  });

  it("TS wyprowadza predykat dla isString", () => {
    const strings = [1, "a", null, "b"].filter(isString);
    type _strings = Expect<Equal<typeof strings, string[]>>;
    expect(strings).toEqual(["a", "b"]);
  });
});
