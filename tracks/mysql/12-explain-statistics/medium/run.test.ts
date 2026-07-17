import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Histogram", () => {
  it("zapisuje statystyki rozkładu kolumny w data dictionary", async () => {
    await withMySql(
      "CREATE TABLE events(id INT PRIMARY KEY, created_at DATETIME NOT NULL, status VARCHAR(20) NOT NULL);\nSET SESSION cte_max_recursion_depth=6000;\nINSERT INTO events WITH RECURSIVE seq AS (SELECT 1 n UNION ALL SELECT n+1 FROM seq WHERE n<5000)\nSELECT n, TIMESTAMP('2025-01-01') + INTERVAL n HOUR, IF(n % 100=0,'error','ok') FROM seq",
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        const histogram = await rows(
          connection,
          "SELECT HISTOGRAM AS histogram FROM information_schema.column_statistics WHERE schema_name=DATABASE() AND table_name='events' AND column_name='status'",
        );
        expect(histogram).toHaveLength(1);
        const value = histogram[0].histogram;
        const parsed = typeof value === "string" ? JSON.parse(value) : value;
        expect(
          (parsed as Record<string, unknown>)["number-of-buckets-specified"],
        ).toBe(16);
      },
    );
  });
});
