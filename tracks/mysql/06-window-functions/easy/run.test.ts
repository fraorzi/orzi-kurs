import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Ponumeruj zamówienia klienta", () => {
  it("wykonuje poprawny kontrakt na MySQL 8.4", async () => {
    await withMySql(
      "CREATE TABLE orders (id BIGINT PRIMARY KEY, customer_id BIGINT NOT NULL, created_at DATETIME NOT NULL); INSERT INTO orders VALUES (1,1,'2026-01-01'),(2,1,'2026-01-03'),(3,2,'2026-01-02');",
      async (connection) => {
        const sql = readTaskSql(import.meta.url);
        const [result] =
          await connection.query<import("mysql2").RowDataPacket[]>(sql);
        expect(result).toEqual([
          { id: 2, customer_id: 1, position: 1 },
          { id: 1, customer_id: 1, position: 2 },
          { id: 3, customer_id: 2, position: 1 },
        ]);
      },
    );
  });
});
