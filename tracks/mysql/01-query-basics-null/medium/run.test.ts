import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE orders (
    id BIGINT PRIMARY KEY,
    status VARCHAR(20) NOT NULL,
    shipped_at DATETIME NULL
  );
`;

describe("Znajdź zamówienia bez wysyłki", () => {
  it("zwraca otwarte niewysłane zamówienia rosnąco po id", async () => {
    await withMySql(
      `${schema}
       INSERT INTO orders VALUES
         (4, 'open', NULL),
         (1, 'open', NULL),
         (2, 'cancelled', NULL),
         (3, 'open', '2026-01-01 10:00:00');`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1 },
          { id: 4 },
        ]);
      },
    );
  });

  it("znajduje wiersze z NULL — porównanie = NULL zwróciłoby pusty wynik", async () => {
    await withMySql(
      `${schema}
       INSERT INTO orders VALUES
         (1, 'open', NULL),
         (2, 'open', NULL);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1 },
          { id: 2 },
        ]);
      },
    );
  });

  it("pomija zamówienia wysłane, nawet otwarte", async () => {
    await withMySql(
      `${schema}
       INSERT INTO orders VALUES
         (1, 'open', '2026-02-01 08:00:00'),
         (2, 'open', '2026-02-02 09:30:00');`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual(
          [],
        );
      },
    );
  });

  it("pomija niewysłane zamówienia w innych statusach", async () => {
    await withMySql(
      `${schema}
       INSERT INTO orders VALUES
         (1, 'cancelled', NULL),
         (2, 'draft', NULL),
         (3, 'open', NULL);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 3 },
        ]);
      },
    );
  });
});
