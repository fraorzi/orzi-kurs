import type { Connection } from "mysql2/promise";
import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const FILES = [
  "src/schema.sql",
  "src/migration.sql",
  "src/feed_index.sql",
  "src/place_order.sql",
] as const;

async function apply(connection: Connection): Promise<void> {
  for (const file of FILES) {
    await connection.query(readTaskSql(import.meta.url, file));
  }
}

const seed = (connection: Connection, stock: number) =>
  connection.query(
    `INSERT INTO sellers VALUES (1,'Ada');
     INSERT INTO listings(id,seller_id,price,stock,created_at)
     VALUES (1,1,19.99,${stock},'2026-01-04 10:00:00')`,
  );

describe("marketplace SQL capstone", () => {
  it("constraints odrzucają ujemne pieniądze, zapas i złe ilości", async () => {
    await withMySql("", async (connection) => {
      await apply(connection);
      await seed(connection, 5);
      await expect(
        connection.query("UPDATE listings SET stock=-1 WHERE id=1"),
      ).rejects.toMatchObject({ code: "ER_CHECK_CONSTRAINT_VIOLATED" });
      await expect(
        connection.query("UPDATE listings SET price=-5 WHERE id=1"),
      ).rejects.toMatchObject({ code: "ER_CHECK_CONSTRAINT_VIOLATED" });
      await connection.query("INSERT INTO orders(id,request_id) VALUES (1,'r-1')");
      await expect(
        connection.query(
          "INSERT INTO order_items VALUES (1,1,0,10)",
        ),
      ).rejects.toMatchObject({ code: "ER_CHECK_CONSTRAINT_VIOLATED" });
    });
  });

  it("request_id wymusza idempotencję, a FK chronią relacje", async () => {
    await withMySql("", async (connection) => {
      await apply(connection);
      await seed(connection, 5);
      await connection.query("CALL place_order(101,'req-1',1,1)");
      await expect(
        connection.query("CALL place_order(102,'req-1',1,1)"),
      ).rejects.toMatchObject({ code: "ER_DUP_ENTRY" });
      expect(await rows(connection, "SELECT stock FROM listings WHERE id=1")).toEqual([
        { stock: 4 },
      ]);
      await expect(
        connection.query("DELETE FROM listings WHERE id=1"),
      ).rejects.toMatchObject({ code: "ER_ROW_IS_REFERENCED_2" });
    });
  });

  it("dwa równoległe zakupy ostatniej sztuki zatwierdzają dokładnie jeden", async () => {
    await withMySql("", async (connection, { connect }) => {
      await apply(connection);
      await seed(connection, 1);
      const peer = await connect();
      try {
        const outcomes = await Promise.allSettled([
          connection.query("CALL place_order(101,'req-a',1,1)"),
          peer.query("CALL place_order(102,'req-b',1,1)"),
        ]);
        expect(outcomes.filter((o) => o.status === "fulfilled")).toHaveLength(1);
      } finally {
        await peer.end();
      }
      expect(await rows(connection, "SELECT stock FROM listings WHERE id=1")).toEqual([
        { stock: 0 },
      ]);
      expect(
        await rows(connection, "SELECT COUNT(*) AS count FROM orders"),
      ).toEqual([{ count: 1 }]);
      expect(
        await rows(connection, "SELECT COUNT(*) AS count FROM order_items"),
      ).toEqual([{ count: 1 }]);
    });
  });

  it("nieudany zakup nie zostawia osieroconych wierszy", async () => {
    await withMySql("", async (connection) => {
      await apply(connection);
      await seed(connection, 1);
      await expect(
        connection.query("CALL place_order(101,'req-1',1,5)"),
      ).rejects.toMatchObject({ sqlState: "45000" });
      expect(
        await rows(connection, "SELECT COUNT(*) AS count FROM orders"),
      ).toEqual([{ count: 0 }]);
      expect(
        await rows(connection, "SELECT COUNT(*) AS count FROM order_items"),
      ).toEqual([{ count: 0 }]);
      expect(await rows(connection, "SELECT stock FROM listings WHERE id=1")).toEqual([
        { stock: 1 },
      ]);
    });
  });

  it("migracja dodaje unikalny public_id i zapisuje wersję w ledgerze", async () => {
    await withMySql("", async (connection) => {
      await apply(connection);
      const column = await rows(
        connection,
        `SELECT COLUMN_TYPE AS type, IS_NULLABLE AS nullable
         FROM information_schema.columns
         WHERE table_schema=DATABASE() AND table_name='listings' AND column_name='public_id'`,
      );
      expect(column).toEqual([{ type: "char(26)", nullable: "YES" }]);
      await seed(connection, 5);
      await connection.query("UPDATE listings SET public_id='01JAAAAAAAAAAAAAAAAAAAAAAA'");
      await connection.query(
        "INSERT INTO listings(id,seller_id,price,stock,created_at) VALUES (2,1,5,1,'2026-01-05 10:00:00')",
      );
      await expect(
        connection.query(
          "UPDATE listings SET public_id='01JAAAAAAAAAAAAAAAAAAAAAAA' WHERE id=2",
        ),
      ).rejects.toMatchObject({ code: "ER_DUP_ENTRY" });
      expect(
        await rows(connection, "SELECT version FROM schema_migrations"),
      ).toEqual([{ version: "20260717_add_listing_public_id" }]);
    });
  });

  it("indeks feedu zaczyna się od tenanta i obsługuje keyset", async () => {
    await withMySql("", async (connection) => {
      await apply(connection);
      await seed(connection, 5);
      await connection.query(
        `INSERT INTO listings(id,seller_id,price,stock,created_at) VALUES
         (2,1,10,5,'2026-01-03 10:00:00'),
         (3,1,12,5,'2026-01-02 10:00:00'),
         (4,1,14,5,'2026-01-01 10:00:00')`,
      );
      const index = await rows(
        connection,
        `SELECT COLUMN_NAME AS columnName
         FROM information_schema.statistics
         WHERE table_schema=DATABASE() AND table_name='listings'
           AND index_name='ix_listings_feed'
         ORDER BY SEQ_IN_INDEX`,
      );
      expect(index.map((part) => part.columnName)).toEqual([
        "seller_id",
        "created_at",
        "id",
      ]);
      const plan = await rows(
        connection,
        `EXPLAIN ANALYZE SELECT id,price FROM listings FORCE INDEX(ix_listings_feed)
         WHERE seller_id=1 AND (created_at,id)<('2026-01-03 10:00:00',2)
         ORDER BY created_at DESC, id DESC LIMIT 2`,
      );
      expect(String(plan[0]?.EXPLAIN).toLowerCase()).toContain("ix_listings_feed");
    });
  });
});
