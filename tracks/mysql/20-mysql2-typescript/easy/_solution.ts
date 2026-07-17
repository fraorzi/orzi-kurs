import type { Pool, RowDataPacket } from "mysql2/promise";

export interface User {
  id: number;
  email: string;
}
interface UserRow extends RowDataPacket, User {}

export async function findUserByEmail(
  pool: Pool,
  email: string,
): Promise<User | null> {
  const [rows] = await pool.execute<UserRow[]>(
    "SELECT id,email FROM users WHERE email = ?",
    [email],
  );
  return rows[0] ?? null;
}
