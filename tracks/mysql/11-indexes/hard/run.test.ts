import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Covering index", () => {
  it("tworzy indeks zgodny z kształtem zapytania", async () => {
    await withMySql(
      "CREATE TABLE orders(id BIGINT PRIMARY KEY, tenant_id INT NOT NULL, status VARCHAR(20) NOT NULL, created_at DATETIME(6) NOT NULL, total DECIMAL(10,2) NOT NULL, note VARCHAR(100)); INSERT INTO orders VALUES (1,1,'paid','2026-01-01 10:00:00',10,'a'),(2,1,'paid','2026-01-02 10:00:00',20,'b'),(3,2,'new','2026-01-03 10:00:00',30,'c')",
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        const index = await rows(
          connection,
          "SELECT COLUMN_NAME AS columnName, SEQ_IN_INDEX AS position FROM information_schema.statistics WHERE table_schema=DATABASE() AND table_name='orders' AND index_name='ix_orders_cover' ORDER BY SEQ_IN_INDEX",
        );
        expect(index.map((part) => part.columnName)).toEqual([
          "tenant_id",
          "status",
          "created_at",
          "id",
          "total",
        ]);
        const plan = await rows(
          connection,
          "EXPLAIN SELECT id,total FROM orders FORCE INDEX(ix_orders_cover) WHERE tenant_id=1 AND status='paid' ORDER BY created_at DESC,id DESC",
        );
        expect(plan[0].key).toBe("ix_orders_cover");
        expect(String(plan[0].Extra)).toContain("Using index");
      },
    );
  });
});
