import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Statement digests", () => {
  it("agreguje znormalizowane zapytania i przelicza czas", async () => {
    await withMySql(
      "CREATE TABLE obs_events(id INT PRIMARY KEY, category VARCHAR(20)); INSERT INTO obs_events VALUES (1,'rare'),(2,'common'),(3,'common')",
      async (connection) => {
        for (let index = 0; index < 3; index += 1) {
          await connection.query(
            "SELECT COUNT(*) FROM obs_events WHERE category = ?",
            [index === 0 ? "rare" : "common"],
          );
        }
        const [raw] = await connection.query(readTaskSql(import.meta.url));
        const report = raw as Array<Record<string, unknown>>;
        const eventDigest = report.find(
          (row) =>
            String(row.digest).toLowerCase().includes("obs_events") &&
            Number(row.executions) >= 3,
        );
        expect(eventDigest).toBeDefined();
        expect(Number(eventDigest?.executions)).toBeGreaterThanOrEqual(3);
        expect(Number(eventDigest?.total_seconds)).toBeGreaterThanOrEqual(0);
      },
    );
  });
});
