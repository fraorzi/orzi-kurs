import { describe, expect, it } from "vitest";
import { parseOrderResponse } from "./starter";

describe("parseOrderResponse", () => {
  it("zwraca kompletny model domenowy", () => {
    expect(
      parseOrderResponse({
        id: "ord_7",
        status: "paid",
        total: 25,
        items: [
          { sku: "BOOK", quantity: 2 },
          { sku: "PEN", quantity: 1 },
        ],
      }),
    ).toEqual({
      ok: true,
      value: {
        id: "ord_7",
        status: "paid",
        total: 25,
        items: [
          { sku: "BOOK", quantity: 2 },
          { sku: "PEN", quantity: 1 },
        ],
      },
    });
  });

  it("zbiera błędy pól i elementów", () => {
    expect(
      parseOrderResponse({
        id: "7",
        status: "done",
        total: Number.NaN,
        items: [
          { sku: "", quantity: 0 },
          null,
          { sku: "OK", quantity: 1.5 },
        ],
      }),
    ).toEqual({
      ok: false,
      errors: [
        "id",
        "status",
        "total",
        "items[0].sku",
        "items[0].quantity",
        "items[1]",
        "items[2].quantity",
      ],
    });
  });

  it("zły root lub items daje kontrolowany błąd", () => {
    expect(parseOrderResponse(null)).toEqual({
      ok: false,
      errors: ["order"],
    });
    expect(
      parseOrderResponse({
        id: "ord_1",
        status: "pending",
        total: 0,
        items: {},
      }),
    ).toEqual({ ok: false, errors: ["items"] });
  });
});
