import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE tickets (
    id INT PRIMARY KEY,
    status VARCHAR(20),
    INDEX (status)
  );
`;

describe("Consistent snapshot", () => {
  it("nie zmienia obrazu danych po commicie drugiej sesji", async () => {
    await withMySql(
      `${schema}
       INSERT INTO tickets VALUES (1, 'open');`,
      async (connection, { connect }) => {
        await connection.query(readTaskSql(import.meta.url));
        const writer = await connect();
        try {
          await writer.query("INSERT INTO tickets VALUES (2, 'open')");
          expect(
            await rows(
              connection,
              "SELECT COUNT(*) AS count FROM tickets WHERE status='open'",
            ),
          ).toEqual([{ count: 1 }]);
        } finally {
          await connection.rollback();
          await writer.end();
        }
      },
    );
  });

  it("kolejny odczyt po drugim committed insercie wciąż widzi ten sam snapshot", async () => {
    await withMySql(
      `${schema}
       INSERT INTO tickets VALUES (1, 'open');`,
      async (connection, { connect }) => {
        await connection.query(readTaskSql(import.meta.url));
        const writer = await connect();
        try {
          await writer.query("INSERT INTO tickets VALUES (2, 'open')");
          await rows(
            connection,
            "SELECT COUNT(*) AS count FROM tickets WHERE status='open'",
          );
          await writer.query("INSERT INTO tickets VALUES (3, 'open')");
          expect(
            await rows(
              connection,
              "SELECT COUNT(*) AS count FROM tickets WHERE status='open'",
            ),
          ).toEqual([{ count: 1 }]);
        } finally {
          await connection.rollback();
          await writer.end();
        }
      },
    );
  });

  it("po zakończeniu transakcji nowa transakcja widzi już zaktualizowane dane", async () => {
    await withMySql(
      `${schema}
       INSERT INTO tickets VALUES (1, 'open');`,
      async (connection, { connect }) => {
        await connection.query(readTaskSql(import.meta.url));
        const writer = await connect();
        try {
          await writer.query("INSERT INTO tickets VALUES (2, 'open')");
          await rows(
            connection,
            "SELECT COUNT(*) AS count FROM tickets WHERE status='open'",
          );
          await connection.commit();
          await connection.query("START TRANSACTION");
          expect(
            await rows(
              connection,
              "SELECT COUNT(*) AS count FROM tickets WHERE status='open'",
            ),
          ).toEqual([{ count: 2 }]);
          await connection.commit();
        } finally {
          await writer.end();
        }
      },
    );
  });
});
