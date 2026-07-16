import { describe, expect, it, vi } from "vitest";
import { loadProducts, type ProductResponse } from "./starter";

function response(
  payload: unknown,
  options: { readonly ok?: boolean; readonly status?: number } = {},
): ProductResponse {
  return {
    ok: options.ok ?? true,
    status: options.status ?? 200,
    json: async () => payload,
  };
}

describe("loadProducts", () => {
  it("zwraca zwalidowane dane i używa podanego URL", async () => {
    const payload = [{ id: "p-1", name: "Monitor", price: 1299 }];
    const fetcher = vi.fn(async () => response(payload));

    await expect(loadProducts(fetcher, "/api/catalog")).resolves.toEqual(payload);
    expect(fetcher).toHaveBeenCalledWith("/api/catalog");
  });

  it("odrzuca status HTTP błędu przed parsowaniem JSON", async () => {
    const json = vi.fn(async () => []);
    const fetcher = vi.fn(async () => ({ ok: false, status: 503, json }));

    await expect(loadProducts(fetcher)).rejects.toThrow(/503/);
    expect(json).not.toHaveBeenCalled();
  });

  it.each([
    { payload: { id: "p-1", name: "Monitor", price: 10 }, label: "obiekt zamiast tablicy" },
    { payload: [{ id: "", name: "Monitor", price: 10 }], label: "puste id" },
    { payload: [{ id: "p-1", name: "", price: 10 }], label: "pusta nazwa" },
    { payload: [{ id: "p-1", name: "Monitor", price: -1 }], label: "ujemna cena" },
  ])("odrzuca $label", async ({ payload }) => {
    await expect(loadProducts(async () => response(payload))).rejects.toThrow();
  });
});
