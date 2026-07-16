import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { reverseTuple, type Reverse } from "./starter";

describe("Reverse", () => {
  it("odwraca tuple i zachowuje literały", () => {
    type _result = Expect<
      Equal<
        Reverse<readonly ["GET", "/users", 200]>,
        readonly [200, "/users", "GET"]
      >
    >;
    expect(true).toBe(true);
  });

  it("obsługuje pustą i jednoelementową tuple", () => {
    type _empty = Expect<Equal<Reverse<readonly []>, readonly []>>;
    type _one = Expect<Equal<Reverse<readonly [1]>, readonly [1]>>;
    expect(true).toBe(true);
  });
});

describe("reverseTuple", () => {
  it("inferuje dokładny wynik bez as const", () => {
    const result = reverseTuple(["GET", "/users", 200]);
    type _result = Expect<
      Equal<typeof result, readonly [200, "/users", "GET"]>
    >;
    expect(result).toEqual([200, "/users", "GET"]);
  });

  it("nie mutuje wejścia", () => {
    const input = ["a", "b", "c"] as const;
    expect(reverseTuple(input)).toEqual(["c", "b", "a"]);
    expect(input).toEqual(["a", "b", "c"]);
  });

  it("działa dla dłuższej tuple bez overloadów", () => {
    const result = reverseTuple([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    expect(result).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
  });
});
