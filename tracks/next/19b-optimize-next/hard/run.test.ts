import { describe, expect, it, vi } from "vitest";
import { createRecommendationCache } from "./starter";

describe("recommendation cache key", () => {
  it("zwraca wynik loadera", async () => {
    const get = createRecommendationCache(async (request) => [{
      productId: request.productId,
      price: request.currency === "PLN" ? 49 : 12,
    }]);
    await expect(get({
      tenantId: "t-1", productId: "p-1", currency: "PLN", requestId: "r-1",
    })).resolves.toEqual([{ productId: "p-1", price: 49 }]);
  });

  it("[quality] ignoruje techniczny requestId w kluczu", async () => {
    const load = vi.fn(async () => [{ productId: "p-2", price: 79 }]);
    const get = createRecommendationCache(load);
    const first = get({
      tenantId: "t-1", productId: "p-1", currency: "PLN", requestId: "r-1",
    });
    const second = get({
      tenantId: "t-1", productId: "p-1", currency: "PLN", requestId: "r-2",
    });
    expect(second).toBe(first);
    await Promise.all([first, second]);
    expect(load).toHaveBeenCalledOnce();
  });

  it("nie miesza tenantów ani walut", async () => {
    const load = vi.fn(async () => []);
    const get = createRecommendationCache(load);
    await get({ tenantId: "t-1", productId: "p-1", currency: "PLN", requestId: "1" });
    await get({ tenantId: "t-2", productId: "p-1", currency: "PLN", requestId: "2" });
    await get({ tenantId: "t-1", productId: "p-1", currency: "EUR", requestId: "3" });
    expect(load).toHaveBeenCalledTimes(3);
  });
});
