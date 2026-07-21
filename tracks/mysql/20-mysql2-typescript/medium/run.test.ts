import { describe, expect, it } from "vitest";
import { rows, withMySql } from "@harness/mysql-test";
import { createOrder } from "./starter";

const schema = `
  CREATE TABLE orders(id INT PRIMARY KEY, customer_id INT);
  CREATE TABLE order_items(
    order_id INT,
    product_id INT,
    quantity INT CHECK(quantity > 0),
    FOREIGN KEY(order_id) REFERENCES orders(id)
  );
`;

describe("Pooled transaction", () => {
  it("commit happy path i rollback całego zamówienia po błędzie itemu", async () => {
    await withMySql(schema, async (connection, { createPool }) => {
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
    });
  });

  it(
    "zwalnia połączenie po błędzie — dwanaście kolejnych awarii nie wyczerpuje puli",
    async () => {
      await withMySql(schema, async (_connection, { createPool }) => {
        const pool = createPool();
        try {
          for (let id = 100; id < 112; id += 1) {
            await expect(
              createOrder(pool, {
                id,
                customerId: 1,
                items: [{ productId: 1, quantity: 0 }],
              }),
            ).rejects.toMatchObject({ code: "ER_CHECK_CONSTRAINT_VIOLATED" });
          }
        } finally {
          await pool.end();
        }
      });
    },
    15000,
  );

  it("po nieudanej próbie kolejne poprawne zamówienie nadal się tworzy", async () => {
    await withMySql(schema, async (connection, { createPool }) => {
      const pool = createPool();
      try {
        await expect(
          createOrder(pool, {
            id: 1,
            customerId: 10,
            items: [{ productId: 1, quantity: 0 }],
          }),
        ).rejects.toMatchObject({ code: "ER_CHECK_CONSTRAINT_VIOLATED" });
        await createOrder(pool, {
          id: 2,
          customerId: 10,
          items: [{ productId: 1, quantity: 5 }],
        });
        expect(
          await rows(connection, "SELECT id FROM orders ORDER BY id"),
        ).toEqual([{ id: 2 }]);
      } finally {
        await pool.end();
      }
    });
  });

  it("duplikat id zamówienia oblewa na insercie orders bez osieroconych pozycji", async () => {
    await withMySql(schema, async (connection, { createPool }) => {
      const pool = createPool();
      try {
        await createOrder(pool, {
          id: 1,
          customerId: 10,
          items: [{ productId: 1, quantity: 1 }],
        });
        await expect(
          createOrder(pool, {
            id: 1,
            customerId: 99,
            items: [{ productId: 2, quantity: 3 }],
          }),
        ).rejects.toMatchObject({ code: "ER_DUP_ENTRY" });
        expect(
          await rows(
            connection,
            "SELECT order_id AS orderId, product_id AS productId FROM order_items ORDER BY product_id",
          ),
        ).toEqual([{ orderId: 1, productId: 1 }]);
      } finally {
        await pool.end();
      }
    });
  });
});
