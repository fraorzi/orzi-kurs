import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE orders (
    id INT PRIMARY KEY,
    status VARCHAR(20) NULL,
    note VARCHAR(100)
  );
  CREATE TABLE order_status_audit (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    old_status VARCHAR(20),
    new_status VARCHAR(20)
  );
`;

describe("Trigger audytowy statusu zamówienia", () => {
  it("nie zapisuje audytu, gdy UPDATE zmienia tylko notatkę", async () => {
    await withMySql(
      `${schema} INSERT INTO orders VALUES (1, 'new', 'a');`,
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        await connection.query("UPDATE orders SET note = 'b' WHERE id = 1");
        expect(await rows(connection, "SELECT * FROM order_status_audit")).toEqual([]);
      },
    );
  });

  it("zapisuje jeden wpis przy realnej zmianie statusu", async () => {
    await withMySql(
      `${schema} INSERT INTO orders VALUES (1, 'new', 'a');`,
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        await connection.query("UPDATE orders SET status = 'paid' WHERE id = 1");
        expect(
          await rows(
            connection,
            "SELECT order_id AS orderId, old_status AS oldStatus, new_status AS newStatus FROM order_status_audit",
          ),
        ).toEqual([{ orderId: 1, oldStatus: "new", newStatus: "paid" }]);
      },
    );
  });

  it("traktuje przejście z NULL na wartość jako realną zmianę", async () => {
    await withMySql(
      `${schema} INSERT INTO orders VALUES (1, NULL, 'a');`,
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        await connection.query("UPDATE orders SET status = 'new' WHERE id = 1");
        expect(
          await rows(
            connection,
            "SELECT order_id AS orderId, old_status AS oldStatus, new_status AS newStatus FROM order_status_audit",
          ),
        ).toEqual([{ orderId: 1, oldStatus: null, newStatus: "new" }]);
      },
    );
  });

  it("przy masowym UPDATE audytuje tylko wiersze z realną zmianą statusu", async () => {
    await withMySql(
      `${schema} INSERT INTO orders VALUES
         (1, 'new', 'a'),
         (2, 'paid', 'b'),
         (3, 'new', 'c');`,
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        await connection.query(
          "UPDATE orders SET status = 'paid' WHERE status = 'new'",
        );
        expect(
          await rows(
            connection,
            `SELECT order_id AS orderId, old_status AS oldStatus, new_status AS newStatus
             FROM order_status_audit ORDER BY order_id`,
          ),
        ).toEqual([
          { orderId: 1, oldStatus: "new", newStatus: "paid" },
          { orderId: 3, oldStatus: "new", newStatus: "paid" },
        ]);
      },
    );
  });
});
