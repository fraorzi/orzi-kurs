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

describe("Użyj EXISTS bez duplikatów", () => {
  it("zwraca klienta dokładnie raz mimo wielu pasujących zamówień", async () => {
    await withMySql(
      `${schema}
       INSERT INTO customers VALUES (1), (2), (3);
       INSERT INTO orders VALUES
         (10, 1, 'paid'),
         (11, 1, 'paid'),
         (12, 2, 'cancelled');`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1 },
        ]);
      },
    );
  });

  it("pomija klienta bez żadnego zamówienia", async () => {
    await withMySql(
      `${schema}
       INSERT INTO customers VALUES (1), (2);
       INSERT INTO orders VALUES (10, 1, 'paid');`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1 },
        ]);
      },
    );
  });

  it("pomija klienta, którego zamówienia są wyłącznie w innym statusie", async () => {
    await withMySql(
      `${schema}
       INSERT INTO customers VALUES (1), (2);
       INSERT INTO orders VALUES
         (10, 1, 'paid'),
         (11, 2, 'cancelled'),
         (12, 2, 'refunded');`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1 },
        ]);
      },
    );
  });

  it("zwraca pusty wynik, gdy żaden klient nie ma opłaconego zamówienia", async () => {
    await withMySql(
      `${schema}
       INSERT INTO customers VALUES (1), (2);
       INSERT INTO orders VALUES (10, 1, 'cancelled');`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual(
          [],
        );
      },
    );
  });
});
