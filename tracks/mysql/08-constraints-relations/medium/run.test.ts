import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Dobierz politykę ON DELETE", () => {
  it("wykonuje poprawny kontrakt na MySQL 8.4", async () => {
    await withMySql("", async (connection) => {
      const sql = readTaskSql(import.meta.url);
      await connection.query(sql);
      await connection.query(
        "INSERT INTO customers VALUES (1); INSERT INTO orders VALUES (10,1); INSERT INTO order_items VALUES (100,10)",
      );
      await expect(
        connection.query("DELETE FROM customers WHERE id=1"),
      ).rejects.toMatchObject({ code: "ER_ROW_IS_REFERENCED_2" });
      await connection.query("DELETE FROM orders WHERE id=10");
      const [items] = await connection.query<import("mysql2").RowDataPacket[]>(
        "SELECT * FROM order_items",
      );
      expect(items).toEqual([]);
    });
  });
});
