import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import type { RouteParams } from "./starter";

type _required = Expect<
  Equal<
    RouteParams<"/teams/:teamId/users/:userId">,
    { teamId: string; userId: string }
  >
>;
type _optional = Expect<
  Equal<
    RouteParams<"/users/:id/:tab?">,
    { id: string; tab?: string }
  >
>;
type _catchAll = Expect<
  Equal<
    RouteParams<"/docs/:version/*rest">,
    { version: string; rest: string[] }
  >
>;
type _static = Expect<Equal<RouteParams<"/health">, {}>>;
type _wide = Expect<
  Equal<
    RouteParams<string>,
    Record<string, string | string[] | undefined>
  >
>;

describe("RouteParams", () => {
  it("parsuje wymagane, opcjonalne i catch-all segmenty", () => {
    expect(true).toBe(true);
  });
});
