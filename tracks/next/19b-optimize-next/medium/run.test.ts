import { describe, expect, it, vi } from "vitest";
import { loadDashboard } from "./starter";

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => { resolve = done; });
  return { promise, resolve };
}

describe("loadDashboard", () => {
  it("zwraca ten sam kontrakt danych", async () => {
    await expect(loadDashboard(async () => 120_000, async () => 42)).resolves.toEqual({
      revenue: 120_000,
      orders: 42,
    });
  });

  it("[quality] rozpoczyna niezależne odczyty przed oczekiwaniem", async () => {
    const revenue = deferred<number>();
    const orders = deferred<number>();
    const loadRevenue = vi.fn(() => revenue.promise);
    const loadOrders = vi.fn(() => orders.promise);
    const pending = loadDashboard(loadRevenue, loadOrders);
    await Promise.resolve();
    expect(loadRevenue).toHaveBeenCalledOnce();
    expect(loadOrders).toHaveBeenCalledOnce();
    revenue.resolve(10);
    orders.resolve(2);
    await expect(pending).resolves.toEqual({ revenue: 10, orders: 2 });
  });
});
