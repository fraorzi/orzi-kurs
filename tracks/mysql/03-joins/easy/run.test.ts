import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE customers (
    id BIGINT PRIMARY KEY,
    email VARCHAR(120) NOT NULL
  );
  CREATE TABLE orders (
    id BIGINT PRIMARY KEY,
    customer_id BIGINT NULL
  );
`;

describe("Połącz zamówienie z klientem przez INNER JOIN", () => {
  it("łączy zamówienie z emailem klienta po customer_id", async () => {
    await withMySql(
      `${schema}
       INSERT INTO customers VALUES (1, 'a@example.com'), (2, 'b@example.com');
       INSERT INTO orders VALUES (10, 2), (11, 1);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 10, email: "b@example.com" },
          { id: 11, email: "a@example.com" },
        ]);
      },
    );
  });

  it("pomija zamówienie bez przypisanego klienta (customer_id NULL)", async () => {
    await withMySql(
      `${schema}
       INSERT INTO customers VALUES (1, 'a@example.com');
       INSERT INTO orders VALUES (10, 1), (11, NULL);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 10, email: "a@example.com" },
        ]);
      },
    );
  });

  it("pomija zamówienie wskazujące na nieistniejącego klienta", async () => {
    await withMySql(
      `${schema}
       INSERT INTO customers VALUES (1, 'a@example.com');
       INSERT INTO orders VALUES (10, 1), (11, 999);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 10, email: "a@example.com" },
        ]);
      },
    );
  });

  it("zwraca pusty wynik, gdy żadne zamówienie nie ma dopasowanego klienta", async () => {
    await withMySql(
      `${schema}
       INSERT INTO customers VALUES (1, 'a@example.com');
       INSERT INTO orders VALUES (10, NULL), (11, 999);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual(
          [],
        );
      },
    );
  });
});
