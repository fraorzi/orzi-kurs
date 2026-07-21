import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";
import type { Connection } from "mysql2/promise";

async function threadId(connection: Connection): Promise<number> {
  return Number(
    (
      await rows(
        connection,
        "SELECT THREAD_ID AS threadId FROM performance_schema.threads WHERE PROCESSLIST_ID=CONNECTION_ID()",
      )
    )[0].threadId,
  );
}

async function waitForLockWait(observer: Connection): Promise<void> {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    const [{ count }] = await rows(
      observer,
      "SELECT COUNT(*) AS count FROM performance_schema.data_lock_waits",
    );
    if (Number(count) > 0) return;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
}

describe("Lock wait report", () => {
  it("wskazuje właściwego waitera, blockera, obiekt i tryb blokady", async () => {
    await withMySql(
      "CREATE TABLE lock_target(id INT PRIMARY KEY, value INT); INSERT INTO lock_target VALUES (1,0)",
      async (blocker, { connect }) => {
        const waiter = await connect();
        const observer = await connect();
        let waitingUpdate: Promise<unknown> | undefined;
        try {
          const waitingThreadId = await threadId(waiter);
          const blockingThreadId = await threadId(blocker);
          await blocker.beginTransaction();
          await blocker.query("SELECT * FROM lock_target WHERE id=1 FOR UPDATE");
          waitingUpdate = waiter.query(
            "UPDATE lock_target SET value=1 WHERE id=1",
          );
          await waitForLockWait(observer);
          const [raw] = await observer.query(readTaskSql(import.meta.url));
          const report = raw as Array<Record<string, unknown>>;
          expect(report).toHaveLength(1);
          expect(Number(report[0].waiting_thread_id)).toBe(waitingThreadId);
          expect(Number(report[0].blocking_thread_id)).toBe(blockingThreadId);
          expect(report[0].object_name).toBe("lock_target");
          expect(report[0].lock_type).toBe("RECORD");
          expect(typeof report[0].lock_mode).toBe("string");
        } finally {
          await blocker.rollback();
          await waitingUpdate;
          await waiter.end();
          await observer.end();
        }
      },
    );
  });

  it("raport jest pusty, gdy żadna sesja nie czeka na blokadę", async () => {
    await withMySql(
      "CREATE TABLE lock_target(id INT PRIMARY KEY, value INT); INSERT INTO lock_target VALUES (1,0)",
      async (connection) => {
        await connection.query("UPDATE lock_target SET value=1 WHERE id=1");
        const [raw] = await connection.query(readTaskSql(import.meta.url));
        expect(raw as Array<Record<string, unknown>>).toEqual([]);
      },
    );
  });

  it("wpis znika, gdy blokująca transakcja się kończy (COMMIT)", async () => {
    await withMySql(
      "CREATE TABLE lock_target(id INT PRIMARY KEY, value INT); INSERT INTO lock_target VALUES (1,0)",
      async (blocker, { connect }) => {
        const waiter = await connect();
        const observer = await connect();
        try {
          await blocker.beginTransaction();
          await blocker.query("SELECT * FROM lock_target WHERE id=1 FOR UPDATE");
          const waitingUpdate = waiter.query(
            "UPDATE lock_target SET value=1 WHERE id=1",
          );
          await waitForLockWait(observer);
          const [duringWait] = await observer.query(readTaskSql(import.meta.url));
          expect(duringWait as Array<Record<string, unknown>>).toHaveLength(1);

          await blocker.commit();
          await waitingUpdate;

          const [afterCommit] = await observer.query(readTaskSql(import.meta.url));
          expect(afterCommit as Array<Record<string, unknown>>).toEqual([]);
        } finally {
          await waiter.end();
          await observer.end();
        }
      },
    );
  });
});
