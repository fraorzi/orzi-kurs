import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Archiwizuj przed usunięciem", () => {
  it("wykonuje poprawny kontrakt na MySQL 8.4", async () => {
    await withMySql(
      "CREATE TABLE sessions (id BIGINT PRIMARY KEY, expires_at DATETIME NOT NULL); CREATE TABLE session_archive LIKE sessions; INSERT INTO sessions VALUES (1,'2020-01-01'),(2,'2030-01-01');",
      async (connection) => {
        const sql = readTaskSql(import.meta.url);
        await connection.query(sql);
        const [live] = await connection.query<import("mysql2").RowDataPacket[]>(
          "SELECT id FROM sessions ORDER BY id",
        );
        const [archived] = await connection.query<
          import("mysql2").RowDataPacket[]
        >("SELECT id FROM session_archive ORDER BY id");
        expect(live).toEqual([{ id: 2 }]);
        expect(archived).toEqual([{ id: 1 }]);
      },
    );
  });
});
