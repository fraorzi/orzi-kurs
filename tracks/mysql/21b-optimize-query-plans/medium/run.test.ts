import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Set-based aggregate", () => {
  it("zachowuje wynik także dla klienta bez zamówień", async () => {
    await withMySql(
      "CREATE TABLE customers(id INT PRIMARY KEY); CREATE TABLE orders(id INT PRIMARY KEY,customer_id INT,total DECIMAL(10,2),INDEX ix_orders_customer(customer_id)); INSERT INTO customers VALUES (1),(2),(3); INSERT INTO orders VALUES (10,1,20),(11,1,30),(12,2,5)",
      async (connection) => {
        const [result] = await connection.query(readTaskSql(import.meta.url));
        expect(result).toEqual([
          { id: 1, total: "50.00" },
          { id: 2, total: "5.00" },
          { id: 3, total: "0.00" },
        ]);
      },
    );
  });

  it("[quality] ma jeden set-based blok agregacji", async () => {
    await withMySql(
      "CREATE TABLE customers(id INT PRIMARY KEY); CREATE TABLE orders(id INT PRIMARY KEY,customer_id INT,total DECIMAL(10,2),INDEX ix_orders_customer(customer_id)); INSERT INTO customers VALUES (1),(2),(3); INSERT INTO orders VALUES (10,1,20),(11,1,30),(12,2,5)",
      async (connection) => {
        const sql = readTaskSql(import.meta.url)
          .trim()
          .replace(/;$/, "");
        expect(sql).not.toMatch(/\(\s*SELECT\s+SUM/i);
        const [raw] = await connection.query(`EXPLAIN FORMAT=JSON ${sql}`);
        expect(JSON.stringify(raw).toLowerCase()).not.toContain(
          '"dependent":true',
        );
      },
    );
  });
});
