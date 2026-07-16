import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  begin: vi.fn(),
  complete: vi.fn(),
  release: vi.fn(),
  create: vi.fn(),
}));
vi.mock("./src/idempotency-store", () => ({
  beginIdempotent: mocks.begin,
  completeIdempotent: mocks.complete,
  releaseIdempotent: mocks.release,
}));
vi.mock("./src/order-store", () => ({ createOrder: mocks.create }));

import { submitOrder } from "./src/actions";

const input = { customerId: "u-1", sku: "keyboard", quantity: 2 } as const;

describe("submitOrder idempotency", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.begin.mockResolvedValue({ kind: "acquired" });
    mocks.create.mockResolvedValue({ orderId: "o-7" });
  });

  it("zajmuje klucz i zapisuje wynik pierwszej próby", async () => {
    await expect(submitOrder("key-1", input)).resolves.toEqual({
      status: "success",
      orderId: "o-7",
      replayed: false,
    });
    expect(mocks.begin).toHaveBeenCalledWith(
      "key-1",
      JSON.stringify({ customerId: "u-1", sku: "keyboard", quantity: 2 }),
    );
    expect(mocks.complete).toHaveBeenCalledWith("key-1", { orderId: "o-7" });
  });

  it("odtwarza zakończony wynik bez ponownej mutacji", async () => {
    mocks.begin.mockResolvedValue({ kind: "completed", result: { orderId: "o-old" } });
    await expect(submitOrder("key-1", input)).resolves.toEqual({
      status: "success",
      orderId: "o-old",
      replayed: true,
    });
    expect(mocks.create).not.toHaveBeenCalled();
  });

  it.each(["conflict", "pending"] as const)("zwraca stan %s bez mutacji", async (kind) => {
    mocks.begin.mockResolvedValue({ kind });
    await expect(submitOrder("key-1", input)).resolves.toEqual({ status: kind });
    expect(mocks.create).not.toHaveBeenCalled();
  });

  it("zwalnia rezerwację po nieoczekiwanej awarii", async () => {
    mocks.create.mockRejectedValue(new Error("payment unavailable"));
    await expect(submitOrder("key-1", input)).rejects.toThrow("payment unavailable");
    expect(mocks.release).toHaveBeenCalledWith("key-1");
    expect(mocks.complete).not.toHaveBeenCalled();
  });
});
