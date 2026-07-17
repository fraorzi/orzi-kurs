import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { resolveTuple, type AwaitedTuple } from "./starter";

describe("AwaitedTuple", () => {
  it("rozpakowuje każdą pozycję i usuwa readonly", async () => {
    const result = await resolveTuple([
      Promise.resolve(1),
      "ready",
      Promise.resolve({ ok: true }),
    ]);
    type _result = Expect<
      Equal<typeof result, [number, "ready", { ok: boolean }]>
    >;
    type _alias = Expect<
      Equal<
        AwaitedTuple<readonly [Promise<number>, "x"]>,
        [number, "x"]
      >
    >;
    expect(result).toEqual([1, "ready", { ok: true }]);
  });

  it("zachowuje kolejność mimo różnego czasu zakończenia", async () => {
    const slow = new Promise<string>((resolve) =>
      setTimeout(() => resolve("first"), 5),
    );
    await expect(
      resolveTuple([slow, Promise.resolve("second")]),
    ).resolves.toEqual(["first", "second"]);
  });
});
