import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE orders (
    id BIGINT PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    created_at DATETIME NOT NULL
  );
`;

describe("Ponumeruj zamówienia klienta", () => {
  it("numeruje zamówienia od 1 osobno dla każdego klienta", async () => {
    await withMySql(
      `${schema}
       INSERT INTO orders VALUES
         (1, 1, '2026-01-01 10:00:00'),
         (2, 1, '2026-01-03 10:00:00'),
         (3, 2, '2026-01-02 10:00:00');`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 2, customer_id: 1, position: 1 },
          { id: 1, customer_id: 1, position: 2 },
          { id: 3, customer_id: 2, position: 1 },
        ]);
      },
    );
  });

  it("rozstrzyga remis identycznego created_at malejąco po id", async () => {
    await withMySql(
      `${schema}
       INSERT INTO orders VALUES
         (11, 5, '2026-01-01 10:00:00'),
         (10, 5, '2026-01-01 10:00:00'),
         (12, 5, '2026-01-02 10:00:00');`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 12, customer_id: 5, position: 1 },
          { id: 11, customer_id: 5, position: 2 },
          { id: 10, customer_id: 5, position: 3 },
        ]);
      },
    );
  });

  it("zwraca pusty wynik, gdy tabela zamówień jest pusta", async () => {
    await withMySql(schema, async (connection) => {
      expect(await rows(connection, readTaskSql(import.meta.url))).toEqual(
        [],
      );
    });
  });

  it("klient z jednym zamówieniem dostaje position 1", async () => {
    await withMySql(
      `${schema}
       INSERT INTO orders VALUES (7, 9, '2026-01-01 10:00:00');`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 7, customer_id: 9, position: 1 },
        ]);
      },
    );
  });
});
