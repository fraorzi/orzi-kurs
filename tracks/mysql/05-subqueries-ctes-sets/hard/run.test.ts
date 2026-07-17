import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Przejdź drzewo rekurencyjnym CTE", () => {
  it("wykonuje poprawny kontrakt na MySQL 8.4", async () => {
    await withMySql(
      "CREATE TABLE categories (id BIGINT PRIMARY KEY, parent_id BIGINT NULL, name VARCHAR(80) NOT NULL); INSERT INTO categories VALUES (1,NULL,'Root'),(2,1,'A'),(3,1,'B'),(4,2,'A1'),(5,NULL,'Other');",
      async (connection) => {
        const sql = readTaskSql(import.meta.url);
        const [result] =
          await connection.query<import("mysql2").RowDataPacket[]>(sql);
        expect(result).toEqual([
          { id: 1, name: "Root", depth: 0 },
          { id: 2, name: "A", depth: 1 },
          { id: 3, name: "B", depth: 1 },
          { id: 4, name: "A1", depth: 2 },
        ]);
      },
    );
  });
});
