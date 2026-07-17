import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Policz kwotę bez utraty precyzji", () => {
  it("wykonuje poprawny kontrakt na MySQL 8.4", async () => {
    await withMySql(
      "CREATE TABLE invoice_lines (id BIGINT PRIMARY KEY, quantity INT NOT NULL, unit_price DECIMAL(10,2) NOT NULL); INSERT INTO invoice_lines VALUES (1,3,9.99),(2,2,5.00);",
      async (connection) => {
        const sql = readTaskSql(import.meta.url);
        const [result] =
          await connection.query<import("mysql2").RowDataPacket[]>(sql);
        expect(result).toEqual([{ total: "39.97" }]);
      },
    );
  });
});
