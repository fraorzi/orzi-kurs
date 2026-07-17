import { describe, expect, it, vi } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  fulfillOrder,
  type AuditEvent,
  type FulfillmentResult,
} from "./starter";

describe("fulfillOrder", () => {
  it("działa z obiektami mającymi dodatkowe możliwości", () => {
    const stock = {
      warehouseId: "WAW",
      reserve: vi.fn(() => true),
      release: vi.fn(),
    };
    const events: AuditEvent[] = [];
    const audit = {
      record: (event: AuditEvent) => events.push(event),
      flush: async () => {},
    };

    const result = fulfillOrder(
      { id: "o1", items: [{ sku: "A", quantity: 2 }] },
      stock,
      audit,
    );
    type _result = Expect<Equal<typeof result, FulfillmentResult>>;
    expect(result).toEqual({ ok: true, reserved: 2 });
    expect(events).toEqual([{ type: "fulfilled", orderId: "o1" }]);
  });

  it("kończy na pierwszej odmowie i audytuje SKU", () => {
    const reserve = vi
      .fn<(sku: string, quantity: number) => boolean>()
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);
    const record = vi.fn();
    const result = fulfillOrder(
      {
        id: "o2",
        items: [
          { sku: "A", quantity: 1 },
          { sku: "B", quantity: 3 },
          { sku: "C", quantity: 1 },
        ],
      },
      { reserve },
      { record },
    );

    expect(result).toEqual({ ok: false, failedSku: "B" });
    expect(reserve).toHaveBeenCalledTimes(2);
    expect(record).toHaveBeenCalledWith({
      type: "rejected",
      orderId: "o2",
      sku: "B",
    });
  });

  it("odrzuca puste zamówienie", () => {
    expect(() =>
      fulfillOrder(
        { id: "empty", items: [] },
        { reserve: () => true },
        { record: () => {} },
      ),
    ).toThrow(RangeError);
  });

  it("port zapasów nie wymaga konkretnej klasy", () => {
    class LegacyWarehouse {
      reserve(): boolean {
        return true;
      }
    }
    expect(
      fulfillOrder(
        { id: "o3", items: [{ sku: "A", quantity: 1 }] },
        new LegacyWarehouse(),
        { record: () => {} },
      ),
    ).toEqual({ ok: true, reserved: 1 });
  });
});
