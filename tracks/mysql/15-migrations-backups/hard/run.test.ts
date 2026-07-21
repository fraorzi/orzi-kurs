import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema =
  "CREATE TABLE orders(id BIGINT PRIMARY KEY, total DECIMAL(10,2)); INSERT INTO orders VALUES (1,10.00)";

describe("Online migration rollout", () => {
  it("dokumentuje restore drill do osobnej bazy przed rolloutem", async () => {
    await withMySql(schema, async () => {
      const sql = readTaskSql(import.meta.url);
      expect(sql).toMatch(/mysqldump\s+--single-transaction/i);
      expect(sql).toMatch(/mysql\s+restore_check\s*</i);
    });
  });

  it("wymusza ALGORITHM=INSTANT zamiast cichego COPY", async () => {
    await withMySql(schema, async () => {
      const sql = readTaskSql(import.meta.url);
      expect(sql).toMatch(/ALGORITHM\s*=\s*INSTANT/i);
    });
  });

  it("nadaje domyślną wartość source zarówno starym, jak i nowym zamówieniom", async () => {
    await withMySql(schema, async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      await connection.query("INSERT INTO orders(id,total) VALUES (2,20.00)");
      expect(
        await rows(connection, "SELECT id,source FROM orders ORDER BY id"),
      ).toEqual([
        { id: 1, source: "web" },
        { id: 2, source: "web" },
      ]);
    });
  });

  it("zapisuje dokładnie jedną wersję migracji i odrzuca jej powtórne zastosowanie", async () => {
    await withMySql(schema, async (connection) => {
      const sql = readTaskSql(import.meta.url);
      await connection.query(sql);
      expect(
        await rows(connection, "SELECT version FROM schema_migrations"),
      ).toEqual([{ version: "20260717_add_orders_source" }]);
      await expect(connection.query(sql)).rejects.toBeTruthy();
    });
  });
});
