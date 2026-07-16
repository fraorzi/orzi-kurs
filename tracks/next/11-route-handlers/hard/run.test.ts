import { afterEach, describe, expect, it, vi } from "vitest";
import { createInventoryGET, type Fetcher } from "./src/route";

describe("inventory BFF", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
  });

  it("wysyła wyłącznie serwerowy sekret i minimalizuje odpowiedź", async () => {
    vi.stubEnv("INVENTORY_API_KEY", "server-secret");
    const fetcher = vi.fn<Fetcher>(async () => Response.json({
      sku: "monitor 4k",
      available: 7,
      internalCost: 199,
    }));
    const response = await createInventoryGET(fetcher)(
      new Request("https://app.example/api/inventory?sku=monitor%204k"),
    );

    expect(fetcher).toHaveBeenCalledWith(
      "https://inventory.example/items/monitor%204k",
      expect.objectContaining({
        headers: { Authorization: "Bearer server-secret" },
        signal: expect.any(AbortSignal),
      }),
    );
    await expect(response.json()).resolves.toEqual({ sku: "monitor 4k", available: 7 });
  });

  it.each([
    { upstream: new Response(null, { status: 404 }), expected: 404 },
    { upstream: new Response(null, { status: 503 }), expected: 502 },
    { upstream: Response.json({ sku: "x", available: -1 }), expected: 502 },
  ])("mapuje upstream na $expected", async ({ upstream, expected }) => {
    const response = await createInventoryGET(async () => upstream)(
      new Request("https://app.example/api/inventory?sku=x"),
    );
    expect(response.status).toBe(expected);
  });

  it("anuluje wiszący upstream i zwraca 504", async () => {
    vi.useFakeTimers();
    const fetcher: Fetcher = async (_input, init) => new Promise((_resolve, reject) => {
      init.signal?.addEventListener("abort", () => {
        reject(new DOMException("aborted", "AbortError"));
      });
    });
    const responsePromise = createInventoryGET(fetcher, 50)(
      new Request("https://app.example/api/inventory?sku=x"),
    );
    await vi.advanceTimersByTimeAsync(51);
    expect((await responsePromise).status).toBe(504);
  });

  it("odrzuca brak sku bez wywołania upstreamu", async () => {
    const fetcher = vi.fn<Fetcher>();
    const response = await createInventoryGET(fetcher)(
      new Request("https://app.example/api/inventory"),
    );
    expect(response.status).toBe(400);
    expect(fetcher).not.toHaveBeenCalled();
  });
});
