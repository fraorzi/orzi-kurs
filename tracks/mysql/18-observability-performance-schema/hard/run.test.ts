import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Per-call query cost", () => {
  it("normalizuje czas i rows examined przez liczbę wykonań", async () => {
    await withMySql(
      "CREATE TABLE expensive_events(id INT PRIMARY KEY, payload VARCHAR(20)); SET SESSION cte_max_recursion_depth=300; INSERT INTO expensive_events WITH RECURSIVE seq AS (SELECT 1 n UNION ALL SELECT n+1 FROM seq WHERE n<200) SELECT n,IF(n=199,'needle','hay') FROM seq",
      async (connection) => {
        await connection.query(
          "SELECT COUNT(*) FROM expensive_events WHERE payload='needle'",
        );
        const [raw] = await connection.query(readTaskSql(import.meta.url));
        const report = raw as Array<Record<string, unknown>>;
        const scan = report.find(
          (row) =>
            String(row.digest).toLowerCase().includes("select count") &&
            String(row.digest).toLowerCase().includes("expensive_events"),
        );
        expect(scan).toBeDefined();
        expect(Number(scan?.avg_ms)).toBeGreaterThanOrEqual(0);
        expect(Number(scan?.rows_examined_per_call)).toBeGreaterThanOrEqual(
          200,
        );
      },
    );
  });
});
