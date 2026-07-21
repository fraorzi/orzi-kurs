import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE orders (
    id BIGINT PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    status VARCHAR(20) NOT NULL,
    total DECIMAL(10,2) NOT NULL
  );
`;

describe("Filtruj grupy przez HAVING", () => {
  it("sumuje tylko opłacone zamówienia klienta i zwraca powyżej progu", async () => {
    await withMySql(
      `${schema}
       INSERT INTO orders VALUES
         (1, 1, 'paid', 60),
         (2, 1, 'paid', 50),
         (3, 2, 'paid', 90),
         (4, 2, 'cancelled', 50);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { customer_id: 1, paid_total: "110.00" },
        ]);
      },
    );
  });

  it("dolicza klienta dokładnie na granicy progu (suma równa 100)", async () => {
    await withMySql(
      `${schema}
       INSERT INTO orders VALUES
         (1, 1, 'paid', 100),
         (2, 2, 'paid', 99.99);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { customer_id: 1, paid_total: "100.00" },
        ]);
      },
    );
  });

  it("pomija klienta, którego nieopłacone zamówienia przekraczają próg, ale opłacone nie", async () => {
    await withMySql(
      `${schema}
       INSERT INTO orders VALUES
         (1, 1, 'paid', 40),
         (2, 1, 'cancelled', 200);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual(
          [],
        );
      },
    );
  });

  it("zwraca pusty wynik, gdy żaden klient nie osiąga progu", async () => {
    await withMySql(
      `${schema}
       INSERT INTO orders VALUES
         (1, 1, 'paid', 30),
         (2, 2, 'paid', 45);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual(
          [],
        );
      },
    );
  });
});
