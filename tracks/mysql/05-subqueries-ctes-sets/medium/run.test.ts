import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE orders (
    id BIGINT PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    total DECIMAL(10,2) NOT NULL
  );
`;

describe("Nazwij etapy raportu CTE", () => {
  it("zwraca klientów o przychodzie powyżej średniej, nie powyżej stałego progu", async () => {
    await withMySql(
      `${schema}
       INSERT INTO orders VALUES
         (1, 1, 100),
         (2, 1, 50),
         (3, 2, 80),
         (4, 3, 10);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { customer_id: 1, revenue: "150.00" },
        ]);
      },
    );
  });

  it("nie zaszywa stałego progu — przelicza średnią dla innej skali danych", async () => {
    await withMySql(
      `${schema}
       INSERT INTO orders VALUES
         (1, 1, 1000),
         (2, 2, 2000),
         (3, 3, 3000);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { customer_id: 3, revenue: "3000.00" },
        ]);
      },
    );
  });

  it("pomija klienta z przychodem dokładnie równym średniej", async () => {
    await withMySql(
      `${schema}
       INSERT INTO orders VALUES
         (1, 1, 50),
         (2, 2, 100),
         (3, 3, 150);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { customer_id: 3, revenue: "150.00" },
        ]);
      },
    );
  });

  it("zwraca pusty wynik, gdy jest tylko jeden klient — jego przychód równy jest średniej", async () => {
    await withMySql(
      `${schema}
       INSERT INTO orders VALUES (1, 1, 500);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual(
          [],
        );
      },
    );
  });
});
