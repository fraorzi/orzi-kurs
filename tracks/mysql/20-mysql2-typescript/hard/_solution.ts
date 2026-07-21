import type { Pool, PoolConnection } from "mysql2/promise";

export type TransactionWork<T> = (connection: PoolConnection) => Promise<T>;

function isRetryable(error: unknown): boolean {
  if (typeof error !== "object" || error === null || !("errno" in error))
    return false;
  return error.errno === 1213 || error.errno === 1205;
}

export async function withTransactionRetry<T>(
  pool: Pool,
  work: TransactionWork<T>,
  maxAttempts = 3,
): Promise<T> {
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      const result = await work(connection);
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      if (!isRetryable(error) || attempt === maxAttempts) throw error;
    } finally {
      connection.release();
    }
  }
  throw new Error("transaction retry exhausted");
}
