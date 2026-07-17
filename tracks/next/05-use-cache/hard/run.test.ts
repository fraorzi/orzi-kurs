import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  cacheLife: vi.fn(),
  cacheTag: vi.fn(),
  readProduct: vi.fn(),
}));

vi.mock("next/cache", () => ({
  cacheLife: mocks.cacheLife,
  cacheTag: mocks.cacheTag,
}));
vi.mock("./src/product-store", () => ({ readProduct: mocks.readProduct }));

import { getProduct } from "./src/catalog-cache";

describe("getProduct cache policy", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.readProduct.mockResolvedValue({
      tenantId: "acme",
      slug: "keyboard",
      name: "Klawiatura",
    });
  });

  it("ustawia jawny lifetime i precyzyjne tagi domenowe", async () => {
    await expect(getProduct("acme", "keyboard")).resolves.toEqual({
      tenantId: "acme",
      slug: "keyboard",
      name: "Klawiatura",
    });

    expect(mocks.cacheLife).toHaveBeenCalledWith("hours");
    expect(mocks.cacheTag).toHaveBeenCalledWith(
      "products",
      "tenant:acme:products",
      "tenant:acme:product:keyboard",
    );
    expect(mocks.readProduct).toHaveBeenCalledWith("acme", "keyboard");
  });
});
