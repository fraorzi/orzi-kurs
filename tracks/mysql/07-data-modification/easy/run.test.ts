import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Wstaw rekord z jawnymi kolumnami", () => {
  it("wykonuje poprawny kontrakt na MySQL 8.4", async () => {
    await withMySql(
      "CREATE TABLE users (id BIGINT PRIMARY KEY, email VARCHAR(120) NOT NULL UNIQUE, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);",
      async (connection) => {
        const sql = readTaskSql(import.meta.url);
        await connection.query(sql);
        const [result] = await connection.query<
          import("mysql2").RowDataPacket[]
        >(
          "SELECT id, email, created_at IS NOT NULL AS has_created_at FROM users",
        );
        expect(result).toEqual([
          { id: 1, email: "a@example.com", has_created_at: 1 },
        ]);
      },
    );
  });
});
