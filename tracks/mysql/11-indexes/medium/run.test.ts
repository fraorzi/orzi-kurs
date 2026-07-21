import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE orders (
    id BIGINT PRIMARY KEY,
    tenant_id INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at DATETIME(6) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    note VARCHAR(100)
  );
  INSERT INTO orders VALUES
    (1, 1, 'paid', '2026-01-01 10:00:00', 10, 'a'),
    (2, 1, 'paid', '2026-01-02 10:00:00', 20, 'b'),
    (3, 2, 'new', '2026-01-03 10:00:00', 30, 'c');
`;

describe("Dobierz kolejność indeksu złożonego", () => {
  it("tworzy indeks w kolejności tenant_id, status, created_at, id", async () => {
    await withMySql(schema, async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      const columns = await rows(
        connection,
        `SELECT COLUMN_NAME AS columnName FROM information_schema.statistics
         WHERE table_schema = DATABASE() AND table_name = 'orders'
           AND index_name = 'ix_orders_feed'
         ORDER BY SEQ_IN_INDEX`,
      );
      expect(columns.map((c) => c.columnName)).toEqual([
        "tenant_id",
        "status",
        "created_at",
        "id",
      ]);
    });
  });

  it("obsługuje pełny kształt feedu bez filesort", async () => {
    await withMySql(schema, async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      const plan = await rows(
        connection,
        `EXPLAIN SELECT id FROM orders FORCE INDEX(ix_orders_feed)
         WHERE tenant_id = 1 AND status = 'paid'
         ORDER BY created_at DESC, id DESC`,
      );
      expect(plan[0].key).toBe("ix_orders_feed");
      expect(String(plan[0].Extra)).not.toContain("filesort");
    });
  });

  it("bez równości po status wymaga dodatkowego sortowania", async () => {
    await withMySql(schema, async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      const plan = await rows(
        connection,
        `EXPLAIN SELECT id FROM orders FORCE INDEX(ix_orders_feed)
         WHERE tenant_id = 1
         ORDER BY created_at DESC, id DESC`,
      );
      expect(String(plan[0].Extra)).toContain("Using filesort");
    });
  });

  it("nie daje dostępu ref przy filtrze wyłącznie po status", async () => {
    await withMySql(schema, async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      const plan = await rows(
        connection,
        "EXPLAIN SELECT id FROM orders FORCE INDEX(ix_orders_feed) WHERE status = 'paid'",
      );
      expect(plan[0].type).not.toBe("ref");
    });
  });
});
