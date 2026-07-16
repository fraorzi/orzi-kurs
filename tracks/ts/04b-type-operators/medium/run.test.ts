import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  formatEvent,
  makeEvent,
  type EventEnvelope,
  type EventName,
  type EventPayload,
} from "./starter";

describe("typy zdarzeń", () => {
  it("wyprowadza nazwy i payloady z mapy", () => {
    type _names = Expect<
      Equal<EventName, "userCreated" | "orderPaid" | "cacheCleared">
    >;
    type _paid = Expect<
      Equal<EventPayload<"orderPaid">, { orderId: string; amount: number }>
    >;
    expect(true).toBe(true);
  });

  it("EventEnvelope jest unią rozłączną", () => {
    type Cleared = Extract<EventEnvelope, { type: "cacheCleared" }>;
    type _cleared = Expect<
      Equal<Cleared, { type: "cacheCleared"; payload: null }>
    >;
    expect(makeEvent("cacheCleared", null)).toEqual({
      type: "cacheCleared",
      payload: null,
    });
  });

  it("nazwa zdarzenia wymusza właściwy payload", () => {
    const illegal = (): unknown =>
      // @ts-expect-error orderPaid nie przyjmuje userId
      makeEvent("orderPaid", { userId: 1, email: "a@b.pl" });
    expect(illegal).toBeTypeOf("function");
  });
});

describe("formatEvent", () => {
  it("formatuje każdy wariant", () => {
    expect(
      formatEvent(
        makeEvent("userCreated", { userId: 7, email: "ala@example.com" }),
      ),
    ).toBe("user:7:ala@example.com");
    expect(
      formatEvent(makeEvent("orderPaid", { orderId: "o1", amount: 12.5 })),
    ).toBe("order:o1:12.50");
    expect(formatEvent(makeEvent("cacheCleared", null))).toBe("cache:cleared");
  });
});
