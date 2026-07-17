import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Filtruj półotwarty zakres czasu", () => {
  it("wykonuje poprawny kontrakt na MySQL 8.4", async () => {
    await withMySql(
      "CREATE TABLE events (id BIGINT PRIMARY KEY, occurred_at DATETIME(6) NOT NULL); INSERT INTO events VALUES (1,'2026-05-01 00:00:00'),(2,'2026-05-01 23:59:59.999999'),(3,'2026-05-02 00:00:00');",
      async (connection) => {
        const sql = readTaskSql(import.meta.url);
        const [result] =
          await connection.query<import("mysql2").RowDataPacket[]>(sql);
        expect(result).toEqual([{ id: 1 }, { id: 2 }]);
      },
    );
  });
});
