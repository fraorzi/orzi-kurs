import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Wybierz aktywnych użytkowników", () => {
  it("wykonuje poprawny kontrakt na MySQL 8.4", async () => {
    await withMySql(
      "CREATE TABLE users (id BIGINT PRIMARY KEY, email VARCHAR(120) NOT NULL, active BOOLEAN NOT NULL); INSERT INTO users VALUES (3,'c@example.com',TRUE),(1,'a@example.com',TRUE),(2,'b@example.com',FALSE);",
      async (connection) => {
        const sql = readTaskSql(import.meta.url);
        const [result] =
          await connection.query<import("mysql2").RowDataPacket[]>(sql);
        expect(result).toEqual([
          { id: 1, email: "a@example.com" },
          { id: 3, email: "c@example.com" },
        ]);
      },
    );
  });
});
