import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE events (
    id BIGINT PRIMARY KEY,
    occurred_at DATETIME(6) NOT NULL
  );
`;

describe("Filtruj półotwarty zakres doby", () => {
  it("obejmuje całą dobę, także ostatnią mikrosekundę", async () => {
    await withMySql(
      `${schema}
       INSERT INTO events VALUES
         (1, '2026-05-01 00:00:00.000001'),
         (2, '2026-05-01 23:59:59.999999');`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1 },
          { id: 2 },
        ]);
      },
    );
  });

  it("wyklucza zdarzenie dokładnie o północy następnej doby", async () => {
    await withMySql(
      `${schema}
       INSERT INTO events VALUES
         (1, '2026-05-01 12:00:00'),
         (2, '2026-05-02 00:00:00');`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1 },
        ]);
      },
    );
  });

  it("wyklucza zdarzenie sprzed początku doby", async () => {
    await withMySql(
      `${schema}
       INSERT INTO events VALUES
         (1, '2026-04-30 23:59:59.999999'),
         (2, '2026-05-01 00:00:00');`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 2 },
        ]);
      },
    );
  });

  it("sortuje wynik rosnąco po id niezależnie od kolejności wstawiania", async () => {
    await withMySql(
      `${schema}
       INSERT INTO events VALUES
         (9, '2026-05-01 08:00:00'),
         (2, '2026-05-01 09:00:00'),
         (5, '2026-05-01 10:00:00');`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 2 },
          { id: 5 },
          { id: 9 },
        ]);
      },
    );
  });
});
