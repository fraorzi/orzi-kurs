import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Locking read", () => {
  it("przy dwóch żądaniach zatwierdza tylko rezerwację pokrytą zapasem", async () => {
    await withMySql(
      "CREATE TABLE inventory(sku VARCHAR(20) PRIMARY KEY, quantity INT NOT NULL); CREATE TABLE reservations(request_id VARCHAR(20) PRIMARY KEY, sku VARCHAR(20), quantity INT); INSERT INTO inventory VALUES ('A',5)",
      async (connection, { connect }) => {
        await connection.query(readTaskSql(import.meta.url));
        const second = await connect();
        try {
          const outcomes = await Promise.allSettled([
            connection.query("CALL reserve_stock('r1','A',4)"),
            second.query("CALL reserve_stock('r2','A',4)"),
          ]);
          expect(
            outcomes.filter((result) => result.status === "fulfilled"),
          ).toHaveLength(1);
          expect(
            await rows(
              connection,
              "SELECT quantity FROM inventory WHERE sku='A'",
            ),
          ).toEqual([{ quantity: 1 }]);
          expect(
            await rows(
              connection,
              "SELECT COUNT(*) AS count FROM reservations",
            ),
          ).toEqual([{ count: 1 }]);
        } finally {
          await second.end();
        }
      },
    );
  });
});
