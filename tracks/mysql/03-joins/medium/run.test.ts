import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Zachowaj klientów bez zamówień", () => {
  it("wykonuje poprawny kontrakt na MySQL 8.4", async () => {
    await withMySql(
      "CREATE TABLE customers (id BIGINT PRIMARY KEY); CREATE TABLE orders (id BIGINT PRIMARY KEY, customer_id BIGINT NOT NULL, status VARCHAR(20) NOT NULL); INSERT INTO customers VALUES (1),(2),(3); INSERT INTO orders VALUES (10,1,'paid'),(11,1,'cancelled'),(12,2,'paid');",
      async (connection) => {
        const sql = readTaskSql(import.meta.url);
        const [result] =
          await connection.query<import("mysql2").RowDataPacket[]>(sql);
        expect(result).toEqual([
          { id: 1, paid_count: 1 },
          { id: 2, paid_count: 1 },
          { id: 3, paid_count: 0 },
        ]);
      },
    );
  });
});
