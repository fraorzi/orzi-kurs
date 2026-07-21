import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE sessions (
    id BIGINT PRIMARY KEY,
    expires_at DATETIME NOT NULL
  );
  CREATE TABLE session_archive LIKE sessions;
`;

describe("Archiwizuj przed usunięciem", () => {
  it("archiwizuje wygasłe sesje i usuwa dokładnie ten sam zbiór z sessions", async () => {
    await withMySql(
      `${schema}
       INSERT INTO sessions VALUES (1, '2020-01-01 00:00:00'), (2, '2030-01-01 00:00:00');`,
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(connection, "SELECT id FROM sessions ORDER BY id"),
        ).toEqual([{ id: 2 }]);
        expect(
          await rows(connection, "SELECT id FROM session_archive ORDER BY id"),
        ).toEqual([{ id: 1 }]);
      },
    );
  });

  it("sesja wygasająca dokładnie na granicy pozostaje aktywna", async () => {
    await withMySql(
      `${schema}
       INSERT INTO sessions VALUES (3, '2026-01-01 00:00:00');`,
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(connection, "SELECT id FROM sessions ORDER BY id"),
        ).toEqual([{ id: 3 }]);
        expect(
          await rows(connection, "SELECT id FROM session_archive"),
        ).toEqual([]);
      },
    );
  });

  it("ponowne uruchomienie tego samego skryptu nie duplikuje archiwum", async () => {
    await withMySql(
      `${schema}
       INSERT INTO sessions VALUES (1, '2020-01-01 00:00:00'), (2, '2030-01-01 00:00:00');`,
      async (connection) => {
        const sql = readTaskSql(import.meta.url);
        await connection.query(sql);
        await connection.query(sql);
        expect(
          await rows(connection, "SELECT id FROM sessions ORDER BY id"),
        ).toEqual([{ id: 2 }]);
        expect(
          await rows(connection, "SELECT id FROM session_archive ORDER BY id"),
        ).toEqual([{ id: 1 }]);
      },
    );
  });

  it("pusta tabela sesji nie powoduje błędu i zostawia archiwum puste", async () => {
    await withMySql(schema, async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      expect(await rows(connection, "SELECT id FROM sessions")).toEqual([]);
      expect(
        await rows(connection, "SELECT id FROM session_archive"),
      ).toEqual([]);
    });
  });
});
