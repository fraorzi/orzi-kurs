import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  persistProductName: vi.fn(),
  revalidateTag: vi.fn(),
  updateTag: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidateTag: mocks.revalidateTag,
  updateTag: mocks.updateTag,
}));
vi.mock("./src/product-store", () => ({
  persistProductName: mocks.persistProductName,
}));

import { renameProduct } from "./src/actions";

describe("renameProduct", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.persistProductName.mockImplementation(
      async (tenantId: string, productId: string, name: string) => ({
        tenantId,
        productId,
        name,
      }),
    );
  });

  it("wygasza listę i szczegół dopiero po udanym zapisie", async () => {
    await expect(renameProduct("acme", "p-7", "  Monitor  ")).resolves.toEqual({
      tenantId: "acme",
      productId: "p-7",
      name: "Monitor",
    });

    expect(mocks.persistProductName).toHaveBeenCalledWith("acme", "p-7", "Monitor");
    expect(mocks.updateTag.mock.calls).toEqual([
      ["tenant:acme:products"],
      ["tenant:acme:product:p-7"],
    ]);
    expect(mocks.revalidateTag).not.toHaveBeenCalled();
  });

  it("nie unieważnia cache'u po błędzie zapisu", async () => {
    mocks.persistProductName.mockRejectedValueOnce(new Error("database unavailable"));

    await expect(renameProduct("acme", "p-7", "Monitor")).rejects.toThrow(
      "database unavailable",
    );
    expect(mocks.updateTag).not.toHaveBeenCalled();
  });
});
