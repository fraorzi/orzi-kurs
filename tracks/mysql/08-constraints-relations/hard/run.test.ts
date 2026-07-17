import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Wymuś tenantową unikalność", () => {
  it("wykonuje poprawny kontrakt na MySQL 8.4", async () => {
    await withMySql("", async (connection) => {
      const sql = readTaskSql(import.meta.url);
      await connection.query(sql);
      await connection.query(
        "INSERT INTO projects VALUES (1,1,'app'),(1,2,'app'); INSERT INTO tasks VALUES (10,1,1)",
      );
      await expect(
        connection.query("INSERT INTO tasks VALUES (11,3,1)"),
      ).rejects.toMatchObject({ code: "ER_NO_REFERENCED_ROW_2" });
      await expect(
        connection.query("INSERT INTO projects VALUES (2,1,'app')"),
      ).rejects.toMatchObject({ code: "ER_DUP_ENTRY" });
    });
  });
});
