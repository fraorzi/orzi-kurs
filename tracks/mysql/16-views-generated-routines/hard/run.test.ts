import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Trigger audytowy", () => {
  it("nie produkuje szumu dla no-op update", async () => {
    await withMySql(
      "CREATE TABLE orders(id INT PRIMARY KEY, status VARCHAR(20), note VARCHAR(100)); CREATE TABLE order_status_audit(id INT AUTO_INCREMENT PRIMARY KEY, order_id INT, old_status VARCHAR(20), new_status VARCHAR(20)); INSERT INTO orders VALUES (1,'new','a')",
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        await connection.query("UPDATE orders SET note='b' WHERE id=1");
        await connection.query("UPDATE orders SET status='paid' WHERE id=1");
        expect(
          await rows(
            connection,
            "SELECT order_id AS orderId,old_status AS oldStatus,new_status AS newStatus FROM order_status_audit",
          ),
        ).toEqual([{ orderId: 1, oldStatus: "new", newStatus: "paid" }]);
      },
    );
  });
});
