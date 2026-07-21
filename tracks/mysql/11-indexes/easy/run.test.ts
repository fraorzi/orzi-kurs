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

describe("Indeksuj filtr statusu", () => {
  it("tworzy jednokolumnowy indeks dokładnie na status", async () => {
    await withMySql(schema, async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      const columns = await rows(
        connection,
        `SELECT COLUMN_NAME AS columnName FROM information_schema.statistics
         WHERE table_schema = DATABASE() AND table_name = 'orders'
           AND index_name = 'ix_orders_status'
         ORDER BY SEQ_IN_INDEX`,
      );
      expect(columns.map((c) => c.columnName)).toEqual(["status"]);
    });
  });

  it("wspiera filtr po statusie przez ref access, nie pełny skan", async () => {
    await withMySql(schema, async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      const plan = await rows(
        connection,
        "EXPLAIN SELECT * FROM orders FORCE INDEX(ix_orders_status) WHERE status = 'paid'",
      );
      expect(plan[0].type).toBe("ref");
      expect(plan[0].key).toBe("ix_orders_status");
    });
  });

  it("nie przyspiesza filtra po kolumnie spoza swojego zasięgu", async () => {
    await withMySql(schema, async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      const plan = await rows(
        connection,
        "EXPLAIN SELECT * FROM orders FORCE INDEX(ix_orders_status) WHERE tenant_id = 1",
      );
      expect(plan[0].type).toBe("ALL");
      expect(plan[0].key).toBeNull();
    });
  });

  it("pozostaje widoczny dla optimizera bez dodatkowej flagi", async () => {
    await withMySql(schema, async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      const visibility = await rows(
        connection,
        `SELECT IS_VISIBLE AS visible FROM information_schema.statistics
         WHERE table_schema = DATABASE() AND table_name = 'orders'
           AND index_name = 'ix_orders_status' LIMIT 1`,
      );
      expect(visibility).toEqual([{ visible: "YES" }]);
    });
  });
});
