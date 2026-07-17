import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Sargowalny zakres", () => {
  it("zachowuje dokładny wynik", async () => {
    await withMySql(
      "CREATE TABLE events(id INT PRIMARY KEY,created_at DATETIME NOT NULL,payload VARCHAR(20),INDEX ix_events_created(created_at));\nSET SESSION cte_max_recursion_depth=1000;\nINSERT INTO events WITH RECURSIVE seq AS (SELECT 1 n UNION ALL SELECT n+1 FROM seq WHERE n<720)\nSELECT n,TIMESTAMP('2026-01-01') + INTERVAL n HOUR,CONCAT('e',n) FROM seq",
      async (connection) => {
        const [result] = await connection.query(readTaskSql(import.meta.url));
        expect((result as Array<{ id: number }>).map((row) => row.id)).toEqual(
          Array.from({ length: 24 }, (_, index) => index + 216),
        );
      },
    );
  });

  it("[quality] używa range access po ix_events_created", async () => {
    await withMySql(
      "CREATE TABLE events(id INT PRIMARY KEY,created_at DATETIME NOT NULL,payload VARCHAR(20),INDEX ix_events_created(created_at));\nSET SESSION cte_max_recursion_depth=1000;\nINSERT INTO events WITH RECURSIVE seq AS (SELECT 1 n UNION ALL SELECT n+1 FROM seq WHERE n<720)\nSELECT n,TIMESTAMP('2026-01-01') + INTERVAL n HOUR,CONCAT('e',n) FROM seq",
      async (connection) => {
        const sql = readTaskSql(import.meta.url)
          .trim()
          .replace(/;$/, "");
        const plan = await rows(connection, `EXPLAIN ${sql}`);
        expect(plan[0].key).toBe("ix_events_created");
        expect(plan[0].type).toBe("range");
      },
    );
  });
});
