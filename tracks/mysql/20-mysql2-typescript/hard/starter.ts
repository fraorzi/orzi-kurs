import type { Pool, PoolConnection } from "mysql2/promise";

export type TransactionWork<T> = (connection: PoolConnection) => Promise<T>;

export async function withTransactionRetry<T>(
  pool: Pool,
  work: TransactionWork<T>,
): Promise<T> {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await work(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
