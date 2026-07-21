import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE events (
    id INT PRIMARY KEY,
    created_at DATETIME NOT NULL,
    status VARCHAR(20) NOT NULL
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

interface HistogramRow {
  histogram: string | Record<string, unknown>;
}

function parseHistogram(row: HistogramRow): Record<string, unknown> {
  return typeof row.histogram === "string"
    ? JSON.parse(row.histogram)
    : row.histogram;
}

describe("Histogram rozkładu statusów", () => {
  it("zapisuje histogram z zadeklarowanymi 16 bucketami", async () => {
    await withMySql(schema, async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      const histogram = await rows<HistogramRow & { histogram: string }>(
        connection,
        `SELECT HISTOGRAM AS histogram FROM information_schema.column_statistics
         WHERE schema_name = DATABASE() AND table_name = 'events' AND column_name = 'status'`,
      );
      expect(histogram).toHaveLength(1);
      expect(parseHistogram(histogram[0])["number-of-buckets-specified"]).toBe(
        16,
      );
    });
  });

  it("histogram trafia w realny typ danych i nie jest pusty", async () => {
    await withMySql(schema, async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      const histogram = await rows<HistogramRow & { histogram: string }>(
        connection,
        `SELECT HISTOGRAM AS histogram FROM information_schema.column_statistics
         WHERE schema_name = DATABASE() AND table_name = 'events' AND column_name = 'status'`,
      );
      const parsed = parseHistogram(histogram[0]);
      expect(parsed["data-type"]).toBe("string");
      expect(
        Array.isArray(parsed.buckets) ? parsed.buckets.length : 0,
      ).toBeGreaterThan(0);
    });
  });

  it("odzwierciedla realny rozkład — error to około 1% wierszy", async () => {
    await withMySql(schema, async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      const histogram = await rows<HistogramRow & { histogram: string }>(
        connection,
        `SELECT HISTOGRAM AS histogram FROM information_schema.column_statistics
         WHERE schema_name = DATABASE() AND table_name = 'events' AND column_name = 'status'`,
      );
      const buckets = parseHistogram(histogram[0]).buckets as Array<
        [string, number]
      >;
      expect(buckets[0][1]).toBeCloseTo(0.01, 2);
    });
  });

  it("przetrwa późniejsze zwykłe ANALYZE TABLE, bo to nie zarządza histogramami", async () => {
    await withMySql(schema, async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      await connection.query("ANALYZE TABLE events");
      const histogram = await rows<HistogramRow & { histogram: string }>(
        connection,
        `SELECT HISTOGRAM AS histogram FROM information_schema.column_statistics
         WHERE schema_name = DATABASE() AND table_name = 'events' AND column_name = 'status'`,
      );
      expect(histogram).toHaveLength(1);
      expect(parseHistogram(histogram[0])["number-of-buckets-specified"]).toBe(
        16,
      );
    });
  });
});
