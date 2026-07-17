import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Stabilny offset", () => {
  it("zwraca stabilną stronę bez duplikatów", async () => {
    await withMySql(
      "CREATE TABLE posts(id BIGINT PRIMARY KEY, tenant_id INT NOT NULL, created_at DATETIME NOT NULL, title VARCHAR(40)); INSERT INTO posts VALUES (1,1,'2026-01-04 10:00:00','p1'),(2,1,'2026-01-04 10:00:00','p2'),(3,1,'2026-01-03 10:00:00','p3'),(4,1,'2026-01-02 10:00:00','p4'),(5,1,'2026-01-02 10:00:00','p5'),(6,1,'2026-01-01 10:00:00','p6'),(7,2,'2026-01-04 10:00:00','other')",
      async (connection) => {
        const [raw] = await connection.query(readTaskSql(import.meta.url));
        const results =
          Array.isArray(raw) && Array.isArray(raw[0]) ? raw.at(-1) : raw;
        expect((results as Array<{ id: number }>).map((row) => row.id)).toEqual(
          [3, 5, 4],
        );
      },
    );
  });
});
