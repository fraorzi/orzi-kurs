import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { defineRoutes, tuple } from "./starter";

describe("defineRoutes", () => {
  it("zachowuje literalne wartości bez as const", () => {
    const routes = defineRoutes({
      home: "/",
      account: "/account",
    });
    type _home = Expect<Equal<typeof routes.home, "/">>;
    type _account = Expect<Equal<typeof routes.account, "/account">>;
    expect(routes).toEqual({ home: "/", account: "/account" });
  });

  it("wymaga ścieżki zaczynającej się od ukośnika", () => {
    const illegal = (): unknown =>
      defineRoutes({
        // @ts-expect-error ścieżka nie spełnia /${string}
        account: "account",
      });
    expect(illegal).toBeTypeOf("function");
  });

  it("zwraca zamrożoną kopię", () => {
    const input = { home: "/" as const };
    const result = defineRoutes(input);
    expect(result).not.toBe(input);
    expect(Object.isFrozen(result)).toBe(true);
  });
});

describe("tuple", () => {
  it("zachowuje pozycje i literały", () => {
    const value = tuple("GET", "/users", 200);
    type _value = Expect<
      Equal<typeof value, readonly ["GET", "/users", 200]>
    >;
    expect(value).toEqual(["GET", "/users", 200]);
  });
});
