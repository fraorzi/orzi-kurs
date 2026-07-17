import { readFileSync } from "node:fs";
import { join } from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { cacheLife, cacheTag, updateTag } from "next/cache";
import { loadCatalog } from "./src/catalog-store";
import { findMembership, findProduct, getUserId, setStock } from "./src/inventory-store";
import { getCatalog, InventoryDashboard, observeInventoryOperation, updateStock } from "./src";

vi.mock("server-only", () => ({}));
vi.mock("next/cache", () => ({ cacheLife: vi.fn(), cacheTag: vi.fn(), updateTag: vi.fn() }));
vi.mock("./src/catalog-store", () => ({
  loadCatalog: vi.fn(),
  loadLowStockAlerts: vi.fn(),
}));
vi.mock("./src/inventory-store", () => ({
  getUserId: vi.fn(), findProduct: vi.fn(), findMembership: vi.fn(), setStock: vi.fn(),
}));

beforeEach(() => vi.clearAllMocks());

describe("inventory operations module", () => {
  it("oznacza tenantowy cache katalogu", async () => {
    vi.mocked(loadCatalog).mockResolvedValue([{
      id: "p-1", tenantId: "t-1", name: "Kawa", stock: 7,
    }]);
    await expect(getCatalog("t-1")).resolves.toHaveLength(1);
    expect(cacheLife).toHaveBeenCalledWith("minutes");
    expect(cacheTag).toHaveBeenCalledWith("catalog", "tenant:t-1:catalog");
    expect(loadCatalog).toHaveBeenCalledWith("t-1");
  });

  it("mutuje dopiero po authz rzeczywistego tenanta i wygasza dwa tagi", async () => {
    vi.mocked(getUserId).mockResolvedValue("u-1");
    vi.mocked(findProduct).mockResolvedValue({
      id: "p-1", tenantId: "t-real", name: "Kawa", stock: 7,
    });
    vi.mocked(findMembership).mockResolvedValue({ role: "manager" });
    const data = new FormData();
    data.set("productId", "p-1");
    data.set("tenantId", "t-forged");
    data.set("stock", "12");
    await expect(updateStock({ status: "idle" }, data)).resolves.toEqual({ status: "success" });
    expect(findMembership).toHaveBeenCalledWith("t-real", "u-1");
    expect(setStock).toHaveBeenCalledWith("p-1", 12);
    expect(vi.mocked(updateTag).mock.calls).toEqual([
      ["product:p-1"], ["tenant:t-real:catalog"],
    ]);

    vi.mocked(findMembership).mockResolvedValue({ role: "viewer" });
    await expect(updateStock({ status: "idle" }, data)).resolves.toEqual({
      status: "error", message: "Produkt niedostępny.",
    });
    expect(setStock).toHaveBeenCalledTimes(1);
  });

  it("pozostawia shell synchroniczny i dwie niezależne granice", () => {
    expect(InventoryDashboard({ tenantId: "t-1" })).not.toBeInstanceOf(Promise);
    const source = readFileSync(join(
      process.cwd(), "tracks/next/module-02/module/src/InventoryDashboard.tsx",
    ), "utf8");
    expect(source.match(/<Suspense/g)).toHaveLength(2);
    expect(source).toContain("Ładowanie katalogu…");
    expect(source).toContain("Ładowanie alertów…");
    expect(source).toMatch(/async function CatalogSection/);
    expect(source).toMatch(/async function AlertsSection/);
  });

  it("zamyka span, loguje allow-listę i zachowuje błąd", async () => {
    const span = { setStatus: vi.fn(), recordException: vi.fn(), end: vi.fn() };
    const log = vi.fn();
    const now = vi.fn().mockReturnValueOnce(10).mockReturnValueOnce(17);
    await expect(observeInventoryOperation({
      name: "stock.update", tenantId: "t-1", productId: "p-1", secret: "token",
      startSpan: vi.fn(() => span), log, now, operation: async () => "ok",
    })).resolves.toBe("ok");
    expect(span.setStatus).toHaveBeenCalledWith("ok");
    expect(span.end).toHaveBeenCalledOnce();
    expect(log).toHaveBeenCalledWith({
      name: "stock.update", tenantId: "t-1", productId: "p-1",
      durationMs: 7, status: "ok",
    });

    const failure = Object.assign(new Error("database password"), { name: "DbTimeout" });
    vi.mocked(now).mockReset().mockReturnValueOnce(20).mockReturnValueOnce(25);
    await expect(observeInventoryOperation({
      name: "stock.update", tenantId: "t-1", productId: "p-1", secret: "token",
      startSpan: () => span, log, now, operation: async () => { throw failure; },
    })).rejects.toBe(failure);
    expect(span.recordException).toHaveBeenCalledWith(failure);
    expect(log).toHaveBeenLastCalledWith({
      name: "stock.update", tenantId: "t-1", productId: "p-1",
      durationMs: 5, status: "error", errorCode: "DbTimeout",
    });
    expect(JSON.stringify(log.mock.calls)).not.toContain("password");
    expect(JSON.stringify(log.mock.calls)).not.toContain("token");
  });
});
