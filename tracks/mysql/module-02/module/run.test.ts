import { describe, expect, it, vi } from "vitest";
import { rows, withMySql } from "@harness/mysql-test";
import {
  MarketplaceRepository,
  isRetryable,
  runWithRetry,
  type DbMetric,
} from "./src/index";

const SCHEMA = `
CREATE TABLE listings(
  id INT PRIMARY KEY,
  public_id VARCHAR(80) UNIQUE,
  stock INT CHECK(stock>=0),
  price DECIMAL(10,2)
);
CREATE TABLE orders(id INT PRIMARY KEY, request_id VARCHAR(80) NOT NULL UNIQUE);
CREATE TABLE order_items(
  order_id INT,
  listing_id INT,
  quantity INT CHECK(quantity>0),
  unit_price DECIMAL(10,2),
  FOREIGN KEY(order_id) REFERENCES orders(id)
);
INSERT INTO listings VALUES (1,'listing-a',1,19.99);
`;

describe("polityka retry", () => {
  it("isRetryable akceptuje wyłącznie deadlock i lock timeout", () => {
    expect(isRetryable(Object.assign(new Error("deadlock"), { errno: 1213 }))).toBe(true);
    expect(isRetryable(Object.assign(new Error("timeout"), { errno: 1205 }))).toBe(true);
    expect(isRetryable(Object.assign(new Error("dup"), { errno: 1062 }))).toBe(false);
    expect(isRetryable(new Error("insufficient stock"))).toBe(false);
    expect(isRetryable("string")).toBe(false);
  });

  it("runWithRetry ponawia błędy przejściowe do limitu i raportuje próby", async () => {
    const transient = Object.assign(new Error("deadlock"), { errno: 1213 });
    let calls = 0;
    const onRetry = vi.fn();
    const result = await runWithRetry(
      3,
      async (attempt) => {
        calls += 1;
        expect(attempt).toBe(calls);
        if (calls < 3) throw transient;
        return "ok";
      },
      onRetry,
    );
    expect(result).toBe("ok");
    expect(onRetry).toHaveBeenCalledTimes(2);
  });

  it("runWithRetry nie ponawia błędów trwałych i respektuje limit", async () => {
    const fatal = Object.assign(new Error("dup"), { errno: 1062 });
    const operation = vi.fn(async () => {
      throw fatal;
    });
    await expect(runWithRetry(3, operation)).rejects.toBe(fatal);
    expect(operation).toHaveBeenCalledTimes(1);

    const transient = Object.assign(new Error("deadlock"), { errno: 1213 });
    const always = vi.fn(async () => {
      throw transient;
    });
    await expect(runWithRetry(3, always)).rejects.toBe(transient);
    expect(always).toHaveBeenCalledTimes(3);
  });
});

describe("MarketplaceRepository", () => {
  it("findListing parametryzuje wejście — injection zwraca null", async () => {
    await withMySql(SCHEMA, async (_connection, { createPool }) => {
      const pool = createPool();
      try {
        const repository = new MarketplaceRepository(pool);
        await expect(repository.findListing("listing-a")).resolves.toEqual({
          id: 1,
          stock: 1,
        });
        await expect(repository.findListing("nope")).resolves.toBeNull();
        await expect(
          repository.findListing("' OR '1'='1"),
        ).resolves.toBeNull();
      } finally {
        await pool.end();
      }
    });
  });

  it("placeOrder zapisuje zamówienie transakcyjnie i emituje metrykę sukcesu", async () => {
    await withMySql(SCHEMA, async (connection, { createPool }) => {
      const pool = createPool();
      const metrics: DbMetric[] = [];
      try {
        const repository = new MarketplaceRepository(pool, (m) => metrics.push(m));
        await repository.placeOrder({
          id: 101,
          requestId: "req-1",
          listingId: 1,
          quantity: 1,
        });
        expect(await rows(connection, "SELECT stock FROM listings WHERE id=1")).toEqual([
          { stock: 0 },
        ]);
        expect(
          await rows(connection, "SELECT order_id AS orderId, quantity FROM order_items"),
        ).toEqual([{ orderId: 101, quantity: 1 }]);
        expect(metrics).toContainEqual(
          expect.objectContaining({
            operation: "placeOrder",
            outcome: "success",
            attempt: 1,
          }),
        );
      } finally {
        await pool.end();
      }
    });
  });

  it("wyścig o ostatnią sztukę: jedno zamówienie, zero osieroconych wierszy", async () => {
    await withMySql(SCHEMA, async (connection, { createPool }) => {
      const pool = createPool();
      try {
        const repository = new MarketplaceRepository(pool);
        const outcomes = await Promise.allSettled([
          repository.placeOrder({ id: 101, requestId: "req-a", listingId: 1, quantity: 1 }),
          repository.placeOrder({ id: 102, requestId: "req-b", listingId: 1, quantity: 1 }),
        ]);
        expect(outcomes.filter((o) => o.status === "fulfilled")).toHaveLength(1);
        expect(await rows(connection, "SELECT stock FROM listings WHERE id=1")).toEqual([
          { stock: 0 },
        ]);
        expect(await rows(connection, "SELECT COUNT(*) AS count FROM orders")).toEqual([
          { count: 1 },
        ]);
        expect(
          await rows(connection, "SELECT COUNT(*) AS count FROM order_items"),
        ).toEqual([{ count: 1 }]);
      } finally {
        await pool.end();
      }
    });
  });

  it("brak stocku: błąd, metryka error i żadnych zapisów", async () => {
    await withMySql(SCHEMA, async (connection, { createPool }) => {
      const pool = createPool();
      const metrics: DbMetric[] = [];
      try {
        const repository = new MarketplaceRepository(pool, (m) => metrics.push(m));
        await expect(
          repository.placeOrder({ id: 101, requestId: "req-1", listingId: 1, quantity: 5 }),
        ).rejects.toThrow();
        expect(await rows(connection, "SELECT COUNT(*) AS count FROM orders")).toEqual([
          { count: 0 },
        ]);
        expect(await rows(connection, "SELECT stock FROM listings WHERE id=1")).toEqual([
          { stock: 1 },
        ]);
        expect(metrics).toContainEqual(
          expect.objectContaining({ operation: "placeOrder", outcome: "error" }),
        );
        expect(
          metrics.every((m) => !Object.values(m).includes("req-1")),
        ).toBe(true);
      } finally {
        await pool.end();
      }
    });
  });

  it("pula nie przecieka: release na każdej ścieżce, retry raportowany metryką", async () => {
    let acquired = 0;
    let released = 0;
    const transient = Object.assign(new Error("deadlock"), { errno: 1213 });
    const connection = {
      beginTransaction: vi.fn(async () => {
        throw transient;
      }),
      rollback: vi.fn(async () => undefined),
      release: vi.fn(() => {
        released += 1;
      }),
    };
    const pool = {
      getConnection: vi.fn(async () => {
        acquired += 1;
        return connection;
      }),
    } as unknown as import("mysql2/promise").Pool;
    const metrics: DbMetric[] = [];
    const repository = new MarketplaceRepository(pool, (m) => metrics.push(m));
    await expect(
      repository.placeOrder({ id: 1, requestId: "r", listingId: 1, quantity: 1 }),
    ).rejects.toBe(transient);
    expect(acquired).toBe(3);
    expect(released).toBe(3);
    expect(metrics.filter((m) => m.outcome === "retry")).toHaveLength(2);
    expect(metrics.filter((m) => m.outcome === "error")).toHaveLength(1);
  });
});
