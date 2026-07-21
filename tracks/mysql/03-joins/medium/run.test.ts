import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE customers (
    id BIGINT PRIMARY KEY
  );
  CREATE TABLE orders (
    id BIGINT PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    status VARCHAR(20) NOT NULL
  );
`;

describe("Zachowaj klientów bez zamówień", () => {
  it("liczy tylko zamówienia o statusie paid, nie inne statusy", async () => {
    await withMySql(
      `${schema}
       INSERT INTO customers VALUES (1), (2);
       INSERT INTO orders VALUES
         (10, 1, 'paid'),
         (11, 1, 'cancelled'),
         (12, 2, 'paid');`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1, paid_count: 1 },
          { id: 2, paid_count: 1 },
        ]);
      },
    );
  });

  it("pokazuje zero dla klienta bez żadnych zamówień", async () => {
    await withMySql(
      `${schema}
       INSERT INTO customers VALUES (1), (2);
       INSERT INTO orders VALUES (10, 1, 'paid');`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1, paid_count: 1 },
          { id: 2, paid_count: 0 },
        ]);
      },
    );
  });

  it("pokazuje zero dla klienta, którego zamówienia istnieją, ale żadne nie jest paid", async () => {
    await withMySql(
      `${schema}
       INSERT INTO customers VALUES (1), (2);
       INSERT INTO orders VALUES
         (10, 1, 'paid'),
         (11, 2, 'cancelled'),
         (12, 2, 'refunded');`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1, paid_count: 1 },
          { id: 2, paid_count: 0 },
        ]);
      },
    );
  });

  it("zachowuje wszystkich klientów z zerem, gdy tabela orders jest pusta", async () => {
    await withMySql(
      `${schema}
       INSERT INTO customers VALUES (1), (2), (3);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1, paid_count: 0 },
          { id: 2, paid_count: 0 },
          { id: 3, paid_count: 0 },
        ]);
      },
    );
  });
});
