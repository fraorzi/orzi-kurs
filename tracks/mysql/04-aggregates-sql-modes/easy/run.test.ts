import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE orders (
    id BIGINT PRIMARY KEY,
    status VARCHAR(20) NOT NULL,
    total DECIMAL(10,2) NOT NULL
  );
`;

describe("Policz metryki per status", () => {
  it("grupuje zamówienia po statusie i liczy metryki", async () => {
    await withMySql(
      `${schema}
       INSERT INTO orders VALUES
         (1, 'paid', 10),
         (2, 'paid', 15),
         (3, 'cancelled', 8);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { status: "cancelled", order_count: 1, total: "8.00" },
          { status: "paid", order_count: 2, total: "25.00" },
        ]);
      },
    );
  });

  it("zwraca pusty wynik dla pustej tabeli zamówień", async () => {
    await withMySql(schema, async (connection) => {
      expect(await rows(connection, readTaskSql(import.meta.url))).toEqual(
        [],
      );
    });
  });

  it("liczy pojedynczy status jako jedną grupę", async () => {
    await withMySql(
      `${schema}
       INSERT INTO orders VALUES
         (1, 'paid', 10),
         (2, 'paid', 20),
         (3, 'paid', 30);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { status: "paid", order_count: 3, total: "60.00" },
        ]);
      },
    );
  });

  it("sortuje grupy alfabetycznie po statusie niezależnie od kolejności wstawiania", async () => {
    await withMySql(
      `${schema}
       INSERT INTO orders VALUES
         (1, 'refunded', 5),
         (2, 'cancelled', 8),
         (3, 'paid', 10);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { status: "cancelled", order_count: 1, total: "8.00" },
          { status: "paid", order_count: 1, total: "10.00" },
          { status: "refunded", order_count: 1, total: "5.00" },
        ]);
      },
    );
  });
});
