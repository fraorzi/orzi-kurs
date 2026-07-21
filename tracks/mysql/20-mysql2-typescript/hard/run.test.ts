import { describe, expect, it } from "vitest";
import { rows, withMySql } from "@harness/mysql-test";
import { withTransactionRetry } from "./starter";

function mysqlError(errno: number, message: string): Error & { errno: number } {
  return Object.assign(new Error(message), { errno });
}

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
          await expect(
            Promise.all([move(1, 2), move(2, 1)]),
          ).resolves.toEqual([undefined, undefined]);
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

  it("nie ponawia błędu, który nie jest deadlockiem ani lock wait timeout", async () => {
    await withMySql("", async (_connection, { createPool }) => {
      const pool = createPool();
      try {
        let calls = 0;
        await expect(
          withTransactionRetry(pool, async () => {
            calls += 1;
            throw mysqlError(1062, "Duplicate entry");
          }),
        ).rejects.toMatchObject({ errno: 1062 });
        expect(calls).toBe(1);
      } finally {
        await pool.end();
      }
    });
  });

  it("ponawia dokładnie tyle razy, ile potrzeba, i zwraca wynik po sukcesie", async () => {
    await withMySql("", async (_connection, { createPool }) => {
      const pool = createPool();
      try {
        let calls = 0;
        await expect(
          withTransactionRetry(pool, async () => {
            calls += 1;
            if (calls < 3) throw mysqlError(1213, "Deadlock found");
            return "done";
          }),
        ).resolves.toBe("done");
        expect(calls).toBe(3);
      } finally {
        await pool.end();
      }
    });
  });

  it("poddaje się po wyczerpaniu prób i rzuca ostatni błąd deadlocku", async () => {
    await withMySql("", async (_connection, { createPool }) => {
      const pool = createPool();
      try {
        let calls = 0;
        await expect(
          withTransactionRetry(pool, async () => {
            calls += 1;
            throw mysqlError(1213, "Deadlock found");
          }),
        ).rejects.toMatchObject({ errno: 1213 });
        expect(calls).toBe(3);
      } finally {
        await pool.end();
      }
    });
  });
});
