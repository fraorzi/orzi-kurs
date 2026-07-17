import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { countBy } from "./starter";

describe("countBy — poprawność", () => {
  it("zachowuje literalną unię kluczy i kolejność pierwszego wystąpienia", () => {
    const items = [
      { status: "open" as const },
      { status: "closed" as const },
      { status: "open" as const },
    ] as const;
    const result = countBy(items, (item) => item.status);
    type _result = Expect<
      Equal<typeof result, Map<"open" | "closed", number>>
    >;
    expect([...result]).toEqual([
      ["open", 2],
      ["closed", 1],
    ]);
  });

  it("używa semantyki kluczy Map dla NaN oraz zera", () => {
    expect([...countBy([Number.NaN, Number.NaN], (value) => value)]).toEqual([
      [Number.NaN, 2],
    ]);
    expect([...countBy([-0, 0], (value) => value)]).toEqual([[0, 2]]);
  });

  it("obsługuje klucze symbol", () => {
    const first = Symbol("first");
    const second = Symbol("second");
    expect([...countBy([first, second, first], (value) => value)]).toEqual([
      [first, 2],
      [second, 1],
    ]);
  });
});

describe("countBy — liczba operacji", () => {
  it("[quality] wywołuje getKey dokładnie raz na element", () => {
    let calls = 0;
    const items = Array.from({ length: 50 }, (_, index) => ({
      group: index % 5,
    }));
    countBy(items, (item) => {
      calls += 1;
      return item.group;
    });
    expect(calls).toBe(items.length);
  });
});
