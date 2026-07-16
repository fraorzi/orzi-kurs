import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { createCachedSelector } from "./starter";

type SearchState = {
  version: number;
  users: readonly string[];
};

describe("createCachedSelector — poprawność", () => {
  it("zachowuje tuple argumentów i typ wyniku", () => {
    const selector = createCachedSelector(
      (state: SearchState, prefix: string, limit: number) =>
        state.users.filter((user) => user.startsWith(prefix)).slice(0, limit),
      (state, prefix, limit) => `${state.version}:${prefix}:${limit}`,
      2,
    );
    type _selector = Expect<
      Equal<
        typeof selector,
        (state: SearchState, prefix: string, limit: number) => string[]
      >
    >;
    expect(
      selector({ version: 1, users: ["anna", "adam", "ewa"] }, "a", 1),
    ).toEqual(["anna"]);
  });

  it.each([0, -1, 1.5, Number.NaN])(
    "odrzuca maxEntries=%s",
    (maxEntries) => {
      expect(() =>
        createCachedSelector(
          (value: number) => value,
          (value) => value,
          maxEntries,
        ),
      ).toThrow(RangeError);
    },
  );
});

describe("createCachedSelector — cache LRU", () => {
  it("[quality] nie przelicza trafień i usuwa najdawniej używany wpis", () => {
    let calls = 0;
    const selector = createCachedSelector(
      (_state: null, key: string) => {
        calls += 1;
        return key.toUpperCase();
      },
      (_state, key) => key,
      2,
    );

    expect(selector(null, "a")).toBe("A");
    expect(selector(null, "b")).toBe("B");
    expect(selector(null, "a")).toBe("A");
    expect(selector(null, "c")).toBe("C");
    expect(selector(null, "a")).toBe("A");
    expect(selector(null, "b")).toBe("B");
    expect(calls).toBe(4);
  });
});
