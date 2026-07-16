import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { attachUser, requireUser } from "./src/auth";
import {
  createRequestContext,
  type RequestContext,
} from "./src/request";

describe("auth augmentation", () => {
  it("rozszerza typ importowany z modułu bazowego", () => {
    type User = NonNullable<RequestContext["user"]>;
    type _user = Expect<
      Equal<User, { id: number; roles: readonly string[] }>
    >;
    const context: RequestContext = {
      requestId: "r1",
      path: "/account",
      user: { id: 7, roles: ["user"] },
    };
    expect(requireUser(context).id).toBe(7);
  });

  it("attachUser nie mutuje kontekstu", () => {
    const context = createRequestContext("r2", "/orders");
    const authenticated = attachUser(context, { id: 3, roles: ["admin"] });
    expect(authenticated.user?.id).toBe(3);
    expect(context.user).toBeUndefined();
  });

  it("requireUser rzuca kontrolowany błąd", () => {
    expect(() =>
      requireUser(createRequestContext("r3", "/private")),
    ).toThrow("unauthenticated");
  });
});
