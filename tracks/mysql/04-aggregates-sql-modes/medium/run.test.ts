import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Filtruj grupy przez HAVING", () => {
  it("wykonuje poprawny kontrakt na MySQL 8.4", async () => {
    await withMySql(
      "CREATE TABLE orders (id BIGINT PRIMARY KEY, customer_id BIGINT NOT NULL, status VARCHAR(20) NOT NULL, total DECIMAL(10,2) NOT NULL); INSERT INTO orders VALUES (1,1,'paid',60),(2,1,'paid',50),(3,2,'paid',90),(4,2,'cancelled',50);",
      async (connection) => {
        const sql = readTaskSql(import.meta.url);
        const [result] =
          await connection.query<import("mysql2").RowDataPacket[]>(sql);
        expect(result).toEqual([{ customer_id: 1, paid_total: "110.00" }]);
      },
    );
  });
});
