import { describe, expect, it } from "vitest";
import { rows, withMySql } from "@harness/mysql-test";
import { MarketplaceRepository, type DbMetric } from "./starter";

describe("MarketplaceRepository capstone", () => {
  it("parametryzuje lookup, serializuje ostatnią sztukę i emituje bezpieczne metryki", async () => {
    await withMySql(
      "CREATE TABLE listings(id INT PRIMARY KEY,public_id VARCHAR(80) UNIQUE,stock INT CHECK(stock>=0),price DECIMAL(10,2)); CREATE TABLE orders(id INT PRIMARY KEY,request_id VARCHAR(80) UNIQUE); CREATE TABLE order_items(order_id INT,listing_id INT,quantity INT CHECK(quantity>0),unit_price DECIMAL(10,2),FOREIGN KEY(order_id) REFERENCES orders(id)); INSERT INTO listings VALUES (1,'listing-a',1,19.99)",
      async (connection, { createPool }) => {
        const pool = createPool();
        const metrics: DbMetric[] = [];
        const repository = new MarketplaceRepository(pool, (metric) =>
          metrics.push(metric),
        );
        try {
          await expect(
            repository.findListing("listing-a"),
          ).resolves.toMatchObject({ id: 1, stock: 1 });
          await expect(
            repository.findListing("' OR 1=1 -- "),
          ).resolves.toBeNull();
          const outcomes = await Promise.allSettled([
            repository.placeOrder({
              id: 101,
              requestId: "request-a",
              listingId: 1,
              quantity: 1,
            }),
            repository.placeOrder({
              id: 102,
              requestId: "request-b",
              listingId: 1,
              quantity: 1,
            }),
          ]);
          expect(
            outcomes.filter((outcome) => outcome.status === "fulfilled"),
          ).toHaveLength(1);
          expect(
            await rows(connection, "SELECT stock FROM listings WHERE id=1"),
          ).toEqual([{ stock: 0 }]);
          expect(
            await rows(connection, "SELECT COUNT(*) AS count FROM orders"),
          ).toEqual([{ count: 1 }]);
          expect(
            await rows(connection, "SELECT COUNT(*) AS count FROM order_items"),
          ).toEqual([{ count: 1 }]);
          expect(
            metrics.some(
              (metric) =>
                metric.operation === "findListing" &&
                metric.outcome === "success",
            ),
          ).toBe(true);
          expect(
            metrics.some(
              (metric) =>
                metric.operation === "placeOrder" &&
                metric.outcome === "success",
            ),
          ).toBe(true);
          expect(
            metrics.some(
              (metric) =>
                metric.operation === "placeOrder" && metric.outcome === "error",
            ),
          ).toBe(true);
          expect(
            metrics.every(
              (metric) =>
                metric.durationMs >= 0 &&
                !Object.values(metric).includes("listing-a"),
            ),
          ).toBe(true);
        } finally {
          await pool.end();
        }
      },
    );
  });
});
