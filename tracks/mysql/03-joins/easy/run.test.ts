import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Połącz zamówienie z klientem", () => {
  it("wykonuje poprawny kontrakt na MySQL 8.4", async () => {
    await withMySql(
      "CREATE TABLE customers (id BIGINT PRIMARY KEY, email VARCHAR(120) NOT NULL); CREATE TABLE orders (id BIGINT PRIMARY KEY, customer_id BIGINT NULL); INSERT INTO customers VALUES (1,'a@example.com'),(2,'b@example.com'); INSERT INTO orders VALUES (10,2),(11,1),(12,NULL);",
      async (connection) => {
        const sql = readTaskSql(import.meta.url);
        const [result] =
          await connection.query<import("mysql2").RowDataPacket[]>(sql);
        expect(result).toEqual([
          { id: 10, email: "b@example.com" },
          { id: 11, email: "a@example.com" },
        ]);
      },
    );
  });
});
