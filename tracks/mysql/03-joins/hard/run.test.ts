import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Pokaż hierarchię pracowników", () => {
  it("wykonuje poprawny kontrakt na MySQL 8.4", async () => {
    await withMySql(
      "CREATE TABLE employees (id BIGINT PRIMARY KEY, email VARCHAR(120) NOT NULL, manager_id BIGINT NULL); INSERT INTO employees VALUES (1,'ceo@example.com',NULL),(2,'lead@example.com',1),(3,'dev@example.com',2);",
      async (connection) => {
        const sql = readTaskSql(import.meta.url);
        const [result] =
          await connection.query<import("mysql2").RowDataPacket[]>(sql);
        expect(result).toEqual([
          { email: "ceo@example.com", manager_email: null },
          { email: "lead@example.com", manager_email: "ceo@example.com" },
          { email: "dev@example.com", manager_email: "lead@example.com" },
        ]);
      },
    );
  });
});
