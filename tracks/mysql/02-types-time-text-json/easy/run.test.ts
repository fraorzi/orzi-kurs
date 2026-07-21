import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE invoice_lines (
    id BIGINT PRIMARY KEY,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL
  );
`;

describe("Policz kwotę faktury bez utraty precyzji", () => {
  it("sumuje pozycje faktury zachowując precyzję DECIMAL", async () => {
    await withMySql(
      `${schema}
       INSERT INTO invoice_lines VALUES
         (1, 3, 9.99),
         (2, 2, 5.00);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { total: "39.97" },
        ]);
      },
    );
  });

  it("nie gubi precyzji przy wielu drobnych kwotach, które w DOUBLE dają błąd binarny", async () => {
    await withMySql(
      `${schema}
       INSERT INTO invoice_lines VALUES
         (1, 1, 0.10),
         (2, 1, 0.10),
         (3, 1, 0.10);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { total: "0.30" },
        ]);
      },
    );
  });

  it("zwraca NULL dla faktury bez żadnej pozycji", async () => {
    await withMySql(schema, async (connection) => {
      expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
        { total: null },
      ]);
    });
  });
});
