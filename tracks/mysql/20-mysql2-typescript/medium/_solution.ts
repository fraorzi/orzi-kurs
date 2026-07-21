import type { Pool } from "mysql2/promise";

export interface OrderInput {
  id: number;
  customerId: number;
  items: Array<{ productId: number; quantity: number }>;
}

export async function createOrder(
  pool: Pool,
  input: OrderInput,
): Promise<void> {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute(
      "INSERT INTO orders(id,customer_id) VALUES (?,?)",
      [input.id, input.customerId],
    );
    for (const item of input.items) {
      await connection.execute(
        "INSERT INTO order_items(order_id,product_id,quantity) VALUES (?,?,?)",
        [input.id, item.productId, item.quantity],
      );
    }
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
