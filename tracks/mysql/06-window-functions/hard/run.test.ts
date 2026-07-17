import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Policz jawny running total", () => {
  it("wykonuje poprawny kontrakt na MySQL 8.4", async () => {
    await withMySql(
      "CREATE TABLE payments (id BIGINT PRIMARY KEY, paid_at DATETIME NOT NULL, amount DECIMAL(10,2) NOT NULL); INSERT INTO payments VALUES (1,'2026-01-01',10),(2,'2026-01-01',20),(3,'2026-01-02',5);",
      async (connection) => {
        const sql = readTaskSql(import.meta.url);
        const [result] =
          await connection.query<import("mysql2").RowDataPacket[]>(sql);
        expect(result).toEqual([
          { id: 1, running_total: "10.00" },
          { id: 2, running_total: "30.00" },
          { id: 3, running_total: "35.00" },
        ]);
      },
    );
  });
});
