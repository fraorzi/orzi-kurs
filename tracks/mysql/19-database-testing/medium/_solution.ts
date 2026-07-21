import type { Connection } from "mysql2/promise";

export async function withRollbackFixture<T>(
  connection: Connection,
  work: () => Promise<T>,
): Promise<T> {
  await connection.beginTransaction();
  try {
    return await work();
  } finally {
    await connection.rollback();
  }
}
