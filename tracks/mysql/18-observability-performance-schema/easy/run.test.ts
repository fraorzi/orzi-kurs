import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

type Row = Record<string, unknown>;

describe("Statement digests", () => {
  it("agreguje powtórzone wykonania jednego kształtu i liczy rows_examined", async () => {
    await withMySql(
      "CREATE TABLE obs_events(id INT PRIMARY KEY, category VARCHAR(20)); INSERT INTO obs_events VALUES (1,'rare'),(2,'common'),(3,'common')",
      async (connection) => {
        await connection.query(
          "TRUNCATE performance_schema.events_statements_summary_by_digest",
        );
        for (const category of ["rare", "common", "common"]) {
          await connection.query(
            "SELECT COUNT(*) FROM obs_events WHERE category = ?",
            [category],
          );
        }
        const [raw] = await connection.query(readTaskSql(import.meta.url));
        const report = raw as Row[];
        const digest = report.find((row) =>
          String(row.digest).toLowerCase().includes("obs_events"),
        );
        expect(digest).toBeDefined();
        expect(Number(digest?.executions)).toBe(3);
        expect(Number(digest?.rows_examined)).toBeGreaterThanOrEqual(3);
        expect(Number(digest?.total_seconds)).toBeGreaterThanOrEqual(0);
      },
    );
  });

  it("normalizuje różne literały tego samego kształtu do jednego digestu", async () => {
    await withMySql(
      "CREATE TABLE obs_orders(id INT PRIMARY KEY, status VARCHAR(20)); INSERT INTO obs_orders VALUES (1,'open'),(2,'paid')",
      async (connection) => {
        await connection.query(
          "TRUNCATE performance_schema.events_statements_summary_by_digest",
        );
        await connection.query("SELECT * FROM obs_orders WHERE id = 1");
        await connection.query("SELECT * FROM obs_orders WHERE id = 2");
        const [raw] = await connection.query(readTaskSql(import.meta.url));
        const report = raw as Row[];
        const matching = report.filter((row) =>
          String(row.digest).toLowerCase().includes("obs_orders"),
        );
        expect(matching).toHaveLength(1);
        expect(Number(matching[0].executions)).toBe(2);
      },
    );
  });

  it("nie miesza w raporcie zapytań wykonanych w innym schemacie", async () => {
    await withMySql(
      "CREATE TABLE obs_local(id INT PRIMARY KEY); INSERT INTO obs_local VALUES (1)",
      async (connection, { database }) => {
        const otherSchema = `obs_other_${randomUUID().replaceAll("-", "").slice(0, 8)}`;
        await connection.query(
          "TRUNCATE performance_schema.events_statements_summary_by_digest",
        );
        await connection.query("SELECT * FROM obs_local WHERE id = 1");
        try {
          await connection.query(`CREATE DATABASE \`${otherSchema}\``);
          await connection.query(`USE \`${otherSchema}\``);
          await connection.query(
            "CREATE TABLE marker(id INT PRIMARY KEY); INSERT INTO marker VALUES (1); SELECT * FROM marker WHERE id = 1",
          );
        } finally {
          await connection.query(`USE \`${database}\``);
        }
        const [raw] = await connection.query(readTaskSql(import.meta.url));
        const report = raw as Row[];
        expect(
          report.some((row) => String(row.digest).toLowerCase().includes("marker")),
        ).toBe(false);
        expect(
          report.some((row) => String(row.digest).toLowerCase().includes("obs_local")),
        ).toBe(true);
        await connection.query(`DROP DATABASE \`${otherSchema}\``);
      },
    );
  });

  it("sortuje malejąco po całkowitym czasie zapytania", async () => {
    await withMySql("", async (connection) => {
      await connection.query(
        "TRUNCATE performance_schema.events_statements_summary_by_digest",
      );
      await connection.query("SELECT SLEEP(0.05)");
      await connection.query("SELECT 1");
      const [raw] = await connection.query(readTaskSql(import.meta.url));
      const report = raw as Row[];
      const sleepIndex = report.findIndex((row) =>
        String(row.digest).toLowerCase().includes("sleep"),
      );
      const fastIndex = report.findIndex((row) => row.digest === "SELECT ?");
      expect(sleepIndex).toBeGreaterThanOrEqual(0);
      expect(fastIndex).toBeGreaterThanOrEqual(0);
      expect(sleepIndex).toBeLessThan(fastIndex);
    });
  });
});
