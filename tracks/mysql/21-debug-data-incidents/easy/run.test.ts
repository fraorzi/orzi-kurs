import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("LEFT JOIN regression", () => {
  it("zachowuje brakującą relację i nie sumuje statusów innych niż paid", async () => {
    await withMySql(
      "CREATE TABLE customers(id INT PRIMARY KEY); CREATE TABLE orders(id INT PRIMARY KEY,customer_id INT,status VARCHAR(20),total DECIMAL(10,2)); INSERT INTO customers VALUES (1),(2),(3); INSERT INTO orders VALUES (10,1,'paid',20),(11,1,'cancelled',99),(12,2,'new',15)",
      async (connection) => {
        const [result] = await connection.query(readTaskSql(import.meta.url));
        expect(result).toEqual([
          { id: 1, paid_total: "20.00" },
          { id: 2, paid_total: "0.00" },
          { id: 3, paid_total: "0.00" },
        ]);
      },
    );
  });
});
