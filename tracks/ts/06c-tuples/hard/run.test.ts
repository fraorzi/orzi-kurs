import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { zip, type Zip } from "./starter";

describe("Zip", () => {
  it("paruje dokładne pozycje", () => {
    type Result = Zip<
      readonly ["id", "name"],
      readonly [1, "Ala"]
    >;
    type _result = Expect<
      Equal<
        Result,
        readonly [
          readonly ["id", 1],
          readonly ["name", "Ala"],
        ]
      >
    >;
    expect(true).toBe(true);
  });
});

describe("zip", () => {
  it("inferuje readonly tuple bez as const", () => {
    const result = zip(["id", "name"], [1, "Ala"]);
    type _result = Expect<
      Equal<
        typeof result,
        readonly [
          readonly ["id", 1],
          readonly ["name", "Ala"],
        ]
      >
    >;
    expect(result).toEqual([
      ["id", 1],
      ["name", "Ala"],
    ]);
  });

  it("odrzuca różne długości", () => {
    const illegal = (): unknown =>
      // @ts-expect-error prawa tuple ma za mało elementów
      zip(["a", "b"], [1]);
    expect(illegal).toBeTypeOf("function");
  });

  it("obsługuje pustą tuple i nie mutuje wejść", () => {
    const left = ["a", "b"] as const;
    const right = [1, 2] as const;
    expect(zip([], [])).toEqual([]);
    expect(zip(left, right)).toEqual([
      ["a", 1],
      ["b", 2],
    ]);
    expect(left).toEqual(["a", "b"]);
    expect(right).toEqual([1, 2]);
  });
});
