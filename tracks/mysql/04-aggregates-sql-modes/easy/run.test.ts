import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Policz metryki per status", () => {
  it("wykonuje poprawny kontrakt na MySQL 8.4", async () => {
    await withMySql(
      "CREATE TABLE orders (id BIGINT PRIMARY KEY, status VARCHAR(20) NOT NULL, total DECIMAL(10,2) NOT NULL); INSERT INTO orders VALUES (1,'paid',10),(2,'paid',15),(3,'cancelled',8);",
      async (connection) => {
        const sql = readTaskSql(import.meta.url);
        const [result] =
          await connection.query<import("mysql2").RowDataPacket[]>(sql);
        expect(result).toEqual([
          { status: "cancelled", order_count: 1, total: "8.00" },
          { status: "paid", order_count: 2, total: "25.00" },
        ]);
      },
    );
  });
});
