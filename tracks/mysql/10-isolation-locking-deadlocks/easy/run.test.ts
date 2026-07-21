import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE inventory (
    sku VARCHAR(20) PRIMARY KEY,
    quantity INT NOT NULL
  );
  CREATE TABLE reservations (
    request_id VARCHAR(20) PRIMARY KEY,
    sku VARCHAR(20),
    quantity INT
  );
`;

describe("Locking read", () => {
  it("przy dwóch żądaniach zatwierdza tylko rezerwację pokrytą zapasem", async () => {
    await withMySql(
      `${schema}
       INSERT INTO inventory VALUES ('A', 5);`,
      async (connection, { connect }) => {
        await connection.query(readTaskSql(import.meta.url));
        const second = await connect();
        try {
          const outcomes = await Promise.allSettled([
            connection.query("CALL reserve_stock('r1','A',4)"),
            second.query("CALL reserve_stock('r2','A',4)"),
          ]);
          expect(
            outcomes.filter((result) => result.status === "fulfilled"),
          ).toHaveLength(1);
          expect(
            await rows(connection, "SELECT quantity FROM inventory WHERE sku='A'"),
          ).toEqual([{ quantity: 1 }]);
          expect(
            await rows(connection, "SELECT COUNT(*) AS count FROM reservations"),
          ).toEqual([{ count: 1 }]);
        } finally {
          await second.end();
        }
      },
    );
  });

  it("SELECT ... FOR UPDATE trzyma blokadę wiersza do końca transakcji", async () => {
    await withMySql(
      `${schema}
       INSERT INTO inventory VALUES ('A', 5);`,
      async (connection, { connect }) => {
        await connection.query(readTaskSql(import.meta.url));
        const holder = await connect();
        const blocked = await connect();
        try {
          await holder.query("START TRANSACTION");
          await rows(
            holder,
            "SELECT quantity FROM inventory WHERE sku='A' FOR UPDATE",
          );
          await blocked.query("SET SESSION innodb_lock_wait_timeout = 1");
          await expect(
            blocked.query("CALL reserve_stock('r2','A',1)"),
          ).rejects.toMatchObject({ code: "ER_LOCK_WAIT_TIMEOUT" });
        } finally {
          await holder.query("ROLLBACK");
          await holder.end();
          await blocked.end();
        }
      },
    );
  });

  it("odrzuca żądanie przekraczające dostępny zapas bez zmiany stanu", async () => {
    await withMySql(
      `${schema}
       INSERT INTO inventory VALUES ('A', 5);`,
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        await expect(
          connection.query("CALL reserve_stock('r1','A',6)"),
        ).rejects.toMatchObject({ code: "ER_SIGNAL_EXCEPTION" });
        expect(
          await rows(connection, "SELECT quantity FROM inventory WHERE sku='A'"),
        ).toEqual([{ quantity: 5 }]);
        expect(
          await rows(connection, "SELECT COUNT(*) AS count FROM reservations"),
        ).toEqual([{ count: 0 }]);
      },
    );
  });
});
