import { describe, expect, it, vi } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { EventBus, type AppEvents } from "./src/events";
import { registerPaymentAudit } from "./src/payments";

describe("payment plugin", () => {
  it("rozszerza mapę zdarzeń rdzenia", () => {
    type Captured = AppEvents["paymentCaptured"];
    type _captured = Expect<
      Equal<Captured, { orderId: string; amount: number }>
    >;
    const bus = new EventBus();
    expect(
      bus.emit("paymentCaptured", { orderId: "o1", amount: 12.5 }),
    ).toBe(0);
  });

  it("odrzuca zły payload pluginu", () => {
    const bus = new EventBus();
    const illegal = (): number =>
      // @ts-expect-error amount musi być number
      bus.emit("paymentCaptured", { orderId: "o1", amount: "12.50" });
    expect(illegal).toBeTypeOf("function");
  });

  it("rejestruje audyt obu zdarzeń i wspólne unsubscribe", () => {
    const bus = new EventBus();
    const audit = vi.fn();
    const unsubscribe = registerPaymentAudit(bus, audit);

    bus.emit("paymentCaptured", { orderId: "o1", amount: 12.5 });
    bus.emit("paymentFailed", { orderId: "o2", reason: "declined" });
    expect(audit.mock.calls).toEqual([
      ["captured:o1:12.50"],
      ["failed:o2:declined"],
    ]);

    unsubscribe();
    expect(
      bus.emit("paymentCaptured", { orderId: "o3", amount: 1 }),
    ).toBe(0);
  });
});
