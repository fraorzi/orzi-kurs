import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Zbuduj stabilne top zamówień", () => {
  it("wykonuje poprawny kontrakt na MySQL 8.4", async () => {
    await withMySql(
      "CREATE TABLE orders (id BIGINT PRIMARY KEY, total DECIMAL(10,2) NOT NULL); INSERT INTO orders VALUES (5,90),(1,100),(3,100),(2,120),(4,80);",
      async (connection) => {
        const sql = readTaskSql(import.meta.url);
        const [result] =
          await connection.query<import("mysql2").RowDataPacket[]>(sql);
        expect(result).toEqual([
          { id: 2, total: "120.00" },
          { id: 1, total: "100.00" },
          { id: 3, total: "100.00" },
        ]);
      },
    );
  });
});
