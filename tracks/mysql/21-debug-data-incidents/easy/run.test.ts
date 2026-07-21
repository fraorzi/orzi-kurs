import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE customers(id INT PRIMARY KEY);
  CREATE TABLE orders(
    id INT PRIMARY KEY,
    customer_id INT,
    status VARCHAR(20),
    total DECIMAL(10,2)
  );
`;

describe("LEFT JOIN regression", () => {
  it("zachowuje brakującą relację i nie sumuje statusów innych niż paid", async () => {
    await withMySql(
      `${schema}
       INSERT INTO customers VALUES (1),(2),(3);
       INSERT INTO orders VALUES
         (10,1,'paid',20),(11,1,'cancelled',99),(12,2,'new',15);`,
      async (connection) => {
        const [result] = await connection.query(readTaskSql(import.meta.url));
        expect(result).toEqual([
          { id: 1, paid_total: "20.00" },
          { id: 2, paid_total: "0.00" },
          { id: 3, paid_total: "0.00" },
        ]);
      },
    );
  });

  it("sumuje więcej niż jedno opłacone zamówienie tego samego klienta", async () => {
    await withMySql(
      `${schema}
       INSERT INTO customers VALUES (1);
       INSERT INTO orders VALUES (10,1,'paid',20),(11,1,'paid',30),(12,1,'cancelled',999);`,
      async (connection) => {
        const [result] = await connection.query(readTaskSql(import.meta.url));
        expect(result).toEqual([{ id: 1, paid_total: "50.00" }]);
      },
    );
  });

  it("klient bez jakichkolwiek zamówień pokazuje paid_total 0, nie znika z wyniku", async () => {
    await withMySql(
      `${schema}
       INSERT INTO customers VALUES (1),(2);
       INSERT INTO orders VALUES (10,1,'paid',20);`,
      async (connection) => {
        const [result] = await connection.query(readTaskSql(import.meta.url));
        expect(result).toEqual([
          { id: 1, paid_total: "20.00" },
          { id: 2, paid_total: "0.00" },
        ]);
      },
    );
  });

  it("puste tabele dają pusty wynik bez błędu", async () => {
    await withMySql(schema, async (connection) => {
      const [result] = await connection.query(readTaskSql(import.meta.url));
      expect(result).toEqual([]);
    });
  });
});
