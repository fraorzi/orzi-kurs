import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { parseUserId, userPath, type UserId } from "./starter";

describe("UserId", () => {
  it("parsuje poprawny format i zwraca branded type", () => {
    const result = parseUserId("usr_42");
    if (!result.ok) throw new Error("expected success");
    type _id = Expect<Equal<typeof result.value, UserId>>;
    expect(userPath(result.value)).toBe("/users/usr_42");
  });

  it.each(["usr_0", "usr_-1", "user_1", "usr_1.5", 1, null])(
    "odrzuca %j",
    (value) => {
      expect(parseUserId(value)).toEqual({
        ok: false,
        message: "invalid user id",
      });
    },
  );

  it("zwykły string nie jest UserId", () => {
    const illegal = (): string =>
      // @ts-expect-error identyfikator musi przejść parser
      userPath("usr_1");
    expect(illegal).toBeTypeOf("function");
  });
});
