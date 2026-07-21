import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE accounts (
    id INT PRIMARY KEY,
    balance DECIMAL(10,2) NOT NULL
  );
  CREATE TABLE ledger (
    id INT AUTO_INCREMENT PRIMARY KEY,
    from_id INT,
    to_id INT,
    amount DECIMAL(10,2)
  );
`;

describe("Atomowy transfer", () => {
  it("zatwierdza oba salda i ledger jako jedną zakończoną transakcję", async () => {
    await withMySql(
      `${schema}
       INSERT INTO accounts VALUES (1, 100.00), (2, 40.00);`,
      async (connection, { connect }) => {
        await connection.query(readTaskSql(import.meta.url));
        const observer = await connect();
        try {
          expect(
            await rows(
              observer,
              "SELECT id, balance FROM accounts ORDER BY id",
            ),
          ).toEqual([
            { id: 1, balance: "70.00" },
            { id: 2, balance: "70.00" },
          ]);
          expect(
            await rows(observer, "SELECT from_id, to_id, amount FROM ledger"),
          ).toEqual([{ from_id: 1, to_id: 2, amount: "30.00" }]);
        } finally {
          await observer.end();
        }
      },
    );
  });

  it("liczy przelew arytmetycznie, nie na sztywno wpisaną wartość końcową", async () => {
    await withMySql(
      `${schema}
       INSERT INTO accounts VALUES (1, 200.00), (2, 5.00);`,
      async (connection) => {
        expect(
          await rows(connection, "SELECT id, balance FROM accounts ORDER BY id"),
        ).toEqual([
          { id: 1, balance: "200.00" },
          { id: 2, balance: "5.00" },
        ]);
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(connection, "SELECT id, balance FROM accounts ORDER BY id"),
        ).toEqual([
          { id: 1, balance: "170.00" },
          { id: 2, balance: "35.00" },
        ]);
      },
    );
  });

  it("nie zostawia połączenia w otwartej, niezakończonej transakcji", async () => {
    await withMySql(
      `${schema}
       INSERT INTO accounts VALUES (1, 100.00), (2, 40.00);`,
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(
            connection,
            "SELECT COUNT(*) AS count FROM information_schema.innodb_trx WHERE trx_mysql_thread_id = CONNECTION_ID()",
          ),
        ).toEqual([{ count: 0 }]);
      },
    );
  });
});
