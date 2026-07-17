import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Invisible index", () => {
  it("pozostaje niewidoczny globalnie, ale da się ocenić hintem jednej instrukcji", async () => {
    await withMySql(
      "CREATE TABLE orders(id INT PRIMARY KEY, customer_id INT, created_at DATETIME, payload TEXT); INSERT INTO orders VALUES (1,7,'2026-01-01','a'),(2,7,'2026-01-02','b')",
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(
            connection,
            "SELECT IS_VISIBLE AS visible FROM information_schema.statistics WHERE table_schema=DATABASE() AND table_name='orders' AND index_name='ix_orders_candidate' LIMIT 1",
          ),
        ).toEqual([{ visible: "NO" }]);
        const plan = await rows(
          connection,
          "EXPLAIN SELECT /*+ SET_VAR(optimizer_switch='use_invisible_indexes=on') */ id FROM orders FORCE INDEX(ix_orders_candidate) WHERE customer_id=7 ORDER BY created_at",
        );
        expect(plan[0].key).toBe("ix_orders_candidate");
        await expect(
          connection.query(
            "EXPLAIN SELECT id FROM orders FORCE INDEX(ix_orders_candidate) WHERE customer_id=7",
          ),
        ).rejects.toMatchObject({ code: "ER_KEY_DOES_NOT_EXITS" });
      },
    );
  });
});
