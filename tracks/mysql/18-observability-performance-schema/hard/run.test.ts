import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

type Row = Record<string, unknown>;

describe("Per-call query cost", () => {
  it("normalizuje czas i rows_examined przez liczbę wykonań", async () => {
    await withMySql(
      "CREATE TABLE expensive_events(id INT PRIMARY KEY, payload VARCHAR(20)); SET SESSION cte_max_recursion_depth=300; INSERT INTO expensive_events WITH RECURSIVE seq AS (SELECT 1 n UNION ALL SELECT n+1 FROM seq WHERE n<200) SELECT n,IF(n=199,'needle','hay') FROM seq",
      async (connection) => {
        await connection.query(
          "TRUNCATE performance_schema.events_statements_summary_by_digest",
        );
        await connection.query(
          "SELECT COUNT(*) FROM expensive_events WHERE payload='needle'",
        );
        const [raw] = await connection.query(readTaskSql(import.meta.url));
        const report = raw as Row[];
        const scan = report.find(
          (row) =>
            String(row.digest).toLowerCase().includes("select count") &&
            String(row.digest).toLowerCase().includes("expensive_events"),
        );
        expect(scan).toBeDefined();
        expect(Number(scan?.executions)).toBe(1);
        expect(Number(scan?.avg_ms)).toBeGreaterThanOrEqual(0);
        expect(Number(scan?.rows_examined_per_call)).toBeGreaterThanOrEqual(200);
      },
    );
  });

  it("dzieli sumę przez liczbę wykonań — częste tanie zapytanie nie wygrywa rzadkiego drogiego", async () => {
    await withMySql("", async (connection) => {
      await connection.query(
        "TRUNCATE performance_schema.events_statements_summary_by_digest",
      );
      for (let i = 0; i < 20; i += 1) {
        await connection.query("SELECT 1");
      }
      await connection.query("SELECT SLEEP(0.05)");
      const [raw] = await connection.query(readTaskSql(import.meta.url));
      const report = raw as Row[];
      const sleepIndex = report.findIndex((row) =>
        String(row.digest).toLowerCase().includes("sleep"),
      );
      const hotIndex = report.findIndex((row) => row.digest === "SELECT ?");
      expect(sleepIndex).toBeGreaterThanOrEqual(0);
      expect(hotIndex).toBeGreaterThanOrEqual(0);
      expect(sleepIndex).toBeLessThan(hotIndex);
      const sleepRow = report[sleepIndex];
      expect(Number(sleepRow.executions)).toBe(1);
      expect(Number(sleepRow.avg_ms)).toBeGreaterThan(20);
    });
  });

  it("ogranicza raport do pięciu najdroższych digestów", async () => {
    await withMySql(
      `CREATE TABLE t1(id INT PRIMARY KEY); CREATE TABLE t2(id INT PRIMARY KEY);
       CREATE TABLE t3(id INT PRIMARY KEY); CREATE TABLE t4(id INT PRIMARY KEY);
       CREATE TABLE t5(id INT PRIMARY KEY); CREATE TABLE t6(id INT PRIMARY KEY);
       CREATE TABLE t7(id INT PRIMARY KEY);`,
      async (connection) => {
        await connection.query(
          "TRUNCATE performance_schema.events_statements_summary_by_digest",
        );
        for (const table of ["t1", "t2", "t3", "t4", "t5", "t6", "t7"]) {
          await connection.query(`SELECT * FROM ${table} WHERE id = 1`);
        }
        const [raw] = await connection.query(readTaskSql(import.meta.url));
        const report = raw as Row[];
        expect(report.length).toBeLessThanOrEqual(5);
      },
    );
  });

  it("ogranicza raport do bieżącego schematu i pomija wiersz przepełnienia", async () => {
    await withMySql(
      "CREATE TABLE local_marker(id INT PRIMARY KEY)",
      async (connection) => {
        await connection.query(
          "TRUNCATE performance_schema.events_statements_summary_by_digest",
        );
        await connection.query("SELECT * FROM local_marker WHERE id = 1");
        const [raw] = await connection.query(readTaskSql(import.meta.url));
        const report = raw as Row[];
        expect(report.every((row) => row.digest !== null)).toBe(true);
        expect(
          report.some((row) =>
            String(row.digest).toLowerCase().includes("local_marker"),
          ),
        ).toBe(true);
      },
    );
  });
});
