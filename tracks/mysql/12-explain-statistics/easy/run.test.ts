import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("EXPLAIN ANALYZE", () => {
  it("wykonuje sargowalny range scan i pokazuje pomiary", async () => {
    await withMySql(
      "CREATE TABLE events(id INT PRIMARY KEY, created_at DATETIME NOT NULL, status VARCHAR(20) NOT NULL, INDEX ix_events_created(created_at));\nSET SESSION cte_max_recursion_depth=6000;\nINSERT INTO events WITH RECURSIVE seq AS (SELECT 1 n UNION ALL SELECT n+1 FROM seq WHERE n<5000)\nSELECT n, TIMESTAMP('2025-01-01') + INTERVAL n HOUR, IF(n % 100=0,'error','ok') FROM seq",
      async (connection) => {
        const [result] = await connection.query(readTaskSql(import.meta.url));
        const tree = String(
          (result as Array<Record<string, unknown>>)[0]["EXPLAIN"],
        );
        expect(tree).toContain("actual time");
        expect(tree.toLowerCase()).toContain("index range scan on events");
        expect(tree).toContain("ix_events_created");
      },
    );
  });
});
