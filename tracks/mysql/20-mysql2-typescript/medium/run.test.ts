import { describe, expect, it } from "vitest";
import { rows, withMySql } from "@harness/mysql-test";
import { createOrder } from "./starter";

describe("Pooled transaction", () => {
  it("commit happy path i rollback całego zamówienia po błędzie itemu", async () => {
    await withMySql(
      "CREATE TABLE orders(id INT PRIMARY KEY,customer_id INT); CREATE TABLE order_items(order_id INT,product_id INT,quantity INT CHECK(quantity > 0),FOREIGN KEY(order_id) REFERENCES orders(id));",
      async (connection, { createPool }) => {
        const pool = createPool();
        try {
          await createOrder(pool, {
            id: 1,
            customerId: 10,
            items: [{ productId: 20, quantity: 2 }],
          });
          await expect(
            createOrder(pool, {
              id: 2,
              customerId: 10,
              items: [{ productId: 21, quantity: 0 }],
            }),
          ).rejects.toMatchObject({ code: "ER_CHECK_CONSTRAINT_VIOLATED" });
          expect(
            await rows(connection, "SELECT id FROM orders ORDER BY id"),
          ).toEqual([{ id: 1 }]);
          expect(
            await rows(
              connection,
              "SELECT order_id AS orderId,quantity FROM order_items",
            ),
          ).toEqual([{ orderId: 1, quantity: 2 }]);
        } finally {
          await pool.end();
        }
      },
    );
  });
});
