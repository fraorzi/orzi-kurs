import type { Connection } from "mysql2/promise";
import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE events (
    id INT PRIMARY KEY,
    created_at DATETIME NOT NULL,
    status VARCHAR(20) NOT NULL,
    INDEX ix_events_created(created_at)
  );
  SET SESSION cte_max_recursion_depth = 6000;
  INSERT INTO events
  WITH RECURSIVE seq AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1 FROM seq WHERE n < 5000
  )
  SELECT n, TIMESTAMP('2025-01-01') + INTERVAL n HOUR, IF(n % 100 = 0, 'error', 'ok')
  FROM seq;
`;

async function explainTree(connection: Connection): Promise<string> {
  const [result] = await connection.query(readTaskSql(import.meta.url));
  return String((result as Array<Record<string, unknown>>)[0].EXPLAIN);
}

describe("EXPLAIN ANALYZE dla sargowalnego predykatu", () => {
  it("uruchamia EXPLAIN ANALYZE, nie samo EXPLAIN — plan niesie realne pomiary", async () => {
    await withMySql(schema, async (connection) => {
      const tree = await explainTree(connection);
      expect(tree).toContain("actual time");
    });
  });

  it("trafia w range scan po ix_events_created zamiast pełnego skanu indeksu", async () => {
    await withMySql(schema, async (connection) => {
      const tree = (await explainTree(connection)).toLowerCase();
      expect(tree).toMatch(/range scan/);
      expect(tree).toContain("ix_events_created");
    });
  });

  it("nie zostawia CAST/DATE() na created_at w wykonanym planie", async () => {
    await withMySql(schema, async (connection) => {
      const tree = (await explainTree(connection)).toLowerCase();
      expect(tree).not.toContain("cast(");
    });
  });

  it("zwraca dokładnie 24 wiersze z 10 stycznia — half-open interval bez sąsiednich dni", async () => {
    await withMySql(schema, async (connection) => {
      const tree = await explainTree(connection);
      expect(tree).toMatch(/rows=24\b/);
      expect(tree).not.toContain("rows=4999");
      expect(tree).not.toContain("rows=5000");
    });
  });
});
