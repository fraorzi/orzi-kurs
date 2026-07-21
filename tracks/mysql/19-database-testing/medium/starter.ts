import type { Connection } from "mysql2/promise";

export async function withRollbackFixture<T>(
  connection: Connection,
  work: () => Promise<T>,
): Promise<T> {
  await connection.beginTransaction();
  try {
    const result = await work();
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  }
}
