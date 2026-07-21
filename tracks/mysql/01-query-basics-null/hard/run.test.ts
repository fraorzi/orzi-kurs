import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE orders (
    id BIGINT PRIMARY KEY,
    total DECIMAL(10,2) NOT NULL
  );
`;

describe("Zbuduj stabilne top zamówień", () => {
  it("zwraca trzy największe zamówienia malejąco po kwocie", async () => {
    await withMySql(
      `${schema}
       INSERT INTO orders VALUES
         (5, 90), (1, 100), (2, 120), (4, 80);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 2, total: "120.00" },
          { id: 1, total: "100.00" },
          { id: 5, total: "90.00" },
        ]);
      },
    );
  });

  it("remis kwot rozstrzyga mniejszym id", async () => {
    await withMySql(
      `${schema}
       INSERT INTO orders VALUES
         (5, 90), (1, 100), (3, 100), (2, 120), (4, 80);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 2, total: "120.00" },
          { id: 1, total: "100.00" },
          { id: 3, total: "100.00" },
        ]);
      },
    );
  });

  it("remis na granicy LIMIT wpuszcza starsze zamówienie", async () => {
    await withMySql(
      `${schema}
       INSERT INTO orders VALUES
         (1, 100), (2, 90), (3, 80), (4, 80);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1, total: "100.00" },
          { id: 2, total: "90.00" },
          { id: 3, total: "80.00" },
        ]);
      },
    );
  });

  it("zwraca wszystkie zamówienia, gdy jest ich mniej niż trzy", async () => {
    await withMySql(
      `${schema}
       INSERT INTO orders VALUES
         (2, 50), (1, 70);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1, total: "70.00" },
          { id: 2, total: "50.00" },
        ]);
      },
    );
  });
});
