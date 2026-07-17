import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Znajdź zamówienia bez wysyłki", () => {
  it("wykonuje poprawny kontrakt na MySQL 8.4", async () => {
    await withMySql(
      "CREATE TABLE orders (id BIGINT PRIMARY KEY, status VARCHAR(20) NOT NULL, shipped_at DATETIME NULL); INSERT INTO orders VALUES (1,'open',NULL),(2,'cancelled',NULL),(3,'open','2026-01-01 10:00:00');",
      async (connection) => {
        const sql = readTaskSql(import.meta.url);
        const [result] =
          await connection.query<import("mysql2").RowDataPacket[]>(sql);
        expect(result).toEqual([{ id: 1 }]);
      },
    );
  });
});
