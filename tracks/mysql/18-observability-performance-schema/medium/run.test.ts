import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

async function threadId(
  connection: Parameters<typeof rows>[0],
): Promise<number> {
  return Number(
    (
      await rows(
        connection,
        "SELECT THREAD_ID AS threadId FROM performance_schema.threads WHERE PROCESSLIST_ID=CONNECTION_ID()",
      )
    )[0].threadId,
  );
}

describe("Lock wait report", () => {
  it("wskazuje właściwego waitera, blockera i obiekt", async () => {
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
          await blocker.query(
            "SELECT * FROM lock_target WHERE id=1 FOR UPDATE",
          );
          waitingUpdate = waiter.query(
            "UPDATE lock_target SET value=1 WHERE id=1",
          );
          for (let attempt = 0; attempt < 40; attempt += 1) {
            if (
              (
                await rows(
                  observer,
                  "SELECT COUNT(*) AS count FROM performance_schema.data_lock_waits",
                )
              )[0].count > 0
            )
              break;
            await new Promise((resolve) => setTimeout(resolve, 10));
          }
          const [raw] = await observer.query(readTaskSql(import.meta.url));
          const report = raw as Array<Record<string, unknown>>;
          expect(report).toHaveLength(1);
          expect(Number(report[0].waiting_thread_id)).toBe(waitingThreadId);
          expect(Number(report[0].blocking_thread_id)).toBe(blockingThreadId);
          expect(report[0].object_name).toBe("lock_target");
        } finally {
          await blocker.rollback();
          await waitingUpdate;
          await waiter.end();
          await observer.end();
        }
      },
    );
  });
});
