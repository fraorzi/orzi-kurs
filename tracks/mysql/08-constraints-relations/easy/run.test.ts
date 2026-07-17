import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Wymuś dodatnią ilość", () => {
  it("wykonuje poprawny kontrakt na MySQL 8.4", async () => {
    await withMySql("", async (connection) => {
      const sql = readTaskSql(import.meta.url);
      await connection.query(sql);
      await connection.query("INSERT INTO order_items VALUES (1, 2)");
      await expect(
        connection.query("INSERT INTO order_items VALUES (2, 0)"),
      ).rejects.toMatchObject({ code: "ER_CHECK_CONSTRAINT_VIOLATED" });
    });
  });
});
