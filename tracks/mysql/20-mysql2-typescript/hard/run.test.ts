import { describe, expect, it } from "vitest";
import { rows, withMySql } from "@harness/mysql-test";
import { withTransactionRetry } from "./starter";

describe("mysql2 deadlock retry", () => {
  it("ponawia całą ofiarę deadlocku na nowej transakcji", async () => {
    await withMySql(
      "CREATE TABLE bins(id INT PRIMARY KEY,quantity INT); INSERT INTO bins VALUES (1,10),(2,10)",
      async (connection, { createPool }) => {
        const pool = createPool();
        const move = (from: number, to: number) =>
          withTransactionRetry(pool, async (transaction) => {
            await transaction.execute(
              "UPDATE bins SET quantity=quantity-1 WHERE id=?",
              [from],
            );
            await transaction.query("DO SLEEP(0.12)");
            await transaction.execute(
              "UPDATE bins SET quantity=quantity+1 WHERE id=?",
              [to],
            );
          });
        try {
          await expect(Promise.all([move(1, 2), move(2, 1)])).resolves.toEqual([
            undefined,
            undefined,
          ]);
          expect(
            await rows(connection, "SELECT id,quantity FROM bins ORDER BY id"),
          ).toEqual([
            { id: 1, quantity: 10 },
            { id: 2, quantity: 10 },
          ]);
        } finally {
          await pool.end();
        }
      },
    );
  });
});
