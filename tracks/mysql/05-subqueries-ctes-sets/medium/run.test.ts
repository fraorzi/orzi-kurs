import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Nazwij etapy raportu CTE", () => {
  it("wykonuje poprawny kontrakt na MySQL 8.4", async () => {
    await withMySql(
      "CREATE TABLE orders (id BIGINT PRIMARY KEY, customer_id BIGINT NOT NULL, total DECIMAL(10,2) NOT NULL); INSERT INTO orders VALUES (1,1,100),(2,1,50),(3,2,80),(4,3,10);",
      async (connection) => {
        const sql = readTaskSql(import.meta.url);
        const [result] =
          await connection.query<import("mysql2").RowDataPacket[]>(sql);
        expect(result).toEqual([{ customer_id: 1, revenue: "150.00" }]);
      },
    );
  });
});
