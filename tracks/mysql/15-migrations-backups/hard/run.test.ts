import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Online migration rollout", () => {
  it("ma restore drill, jawny algorytm i audyt zastosowanej wersji", async () => {
    await withMySql(
      "CREATE TABLE orders(id BIGINT PRIMARY KEY, total DECIMAL(10,2)); INSERT INTO orders VALUES (1,10.00)",
      async (connection) => {
        const sql = readTaskSql(import.meta.url);
        expect(sql).toMatch(/mysqldump\s+--single-transaction/i);
        expect(sql).toMatch(/mysql\s+restore_check\s*</i);
        expect(sql).toMatch(/ALGORITHM\s*=\s*INSTANT/i);
        await connection.query(sql);
        expect(await rows(connection, "SELECT id,source FROM orders")).toEqual([
          { id: 1, source: "web" },
        ]);
        expect(
          await rows(connection, "SELECT version FROM schema_migrations"),
        ).toEqual([{ version: "20260717_add_orders_source" }]);
      },
    );
  });
});
