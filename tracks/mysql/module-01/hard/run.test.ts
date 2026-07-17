import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Marketplace SQL capstone", () => {
  it("łączy constraints, migration ledger, atomowy zakup i keyset plan", async () => {
    await withMySql("", async (connection, { connect }) => {
      await connection.query(readTaskSql(import.meta.url));
      await connection.query(
        "INSERT INTO sellers VALUES (1,'Ada'); INSERT INTO listings(id,seller_id,public_id,price,stock,created_at) VALUES (1,1,'01JAAAAAAAAAAAAAAAAAAAAAAA',19.99,1,'2026-01-04 10:00:00')",
      );
      const peer = await connect();
      try {
        const outcomes = await Promise.allSettled([
          connection.query("CALL place_order(101,'request-a',1,1)"),
          peer.query("CALL place_order(102,'request-b',1,1)"),
        ]);
        expect(
          outcomes.filter((outcome) => outcome.status === "fulfilled"),
        ).toHaveLength(1);
        expect(
          await rows(connection, "SELECT stock FROM listings WHERE id=1"),
        ).toEqual([{ stock: 0 }]);
        expect(
          await rows(connection, "SELECT COUNT(*) AS count FROM orders"),
        ).toEqual([{ count: 1 }]);
        expect(
          await rows(connection, "SELECT COUNT(*) AS count FROM order_items"),
        ).toEqual([{ count: 1 }]);
      } finally {
        await peer.end();
      }

      await expect(
        connection.query("UPDATE listings SET stock=-1 WHERE id=1"),
      ).rejects.toMatchObject({ code: "ER_CHECK_CONSTRAINT_VIOLATED" });
      expect(
        await rows(connection, "SELECT version FROM schema_migrations"),
      ).toEqual([{ version: "20260717_add_listing_public_id" }]);

      await connection.query(
        "INSERT INTO listings(id,seller_id,public_id,price,stock,created_at) VALUES (2,1,'01JBBBBBBBBBBBBBBBBBBBBBBB',10,5,'2026-01-03 10:00:00'),(3,1,'01JCCCCCCCCCCCCCCCCCCCCCCC',12,5,'2026-01-02 10:00:00'),(4,1,'01JDDDDDDDDDDDDDDDDDDDDDDD',14,5,'2026-01-01 10:00:00')",
      );
      const index = await rows(
        connection,
        "SELECT COLUMN_NAME AS columnName FROM information_schema.statistics WHERE table_schema=DATABASE() AND table_name='listings' AND index_name='ix_listings_feed' ORDER BY SEQ_IN_INDEX",
      );
      expect(index.map((part) => part.columnName)).toEqual([
        "seller_id",
        "created_at",
        "id",
      ]);
      const plan = await rows(
        connection,
        "EXPLAIN ANALYZE SELECT id,price FROM listings FORCE INDEX(ix_listings_feed) WHERE seller_id=1 AND (created_at,id)<('2026-01-03 10:00:00',2) ORDER BY created_at DESC,id DESC LIMIT 2",
      );
      const tree = String(plan[0].EXPLAIN).toLowerCase();
      expect(tree).toContain("ix_listings_feed");
      expect(tree).toContain("actual time");
    });
  });
});
