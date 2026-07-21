import type { Pool } from "mysql2/promise";

export interface User {
  id: number;
  email: string;
}

export async function findUserByEmail(
  pool: Pool,
  email: string,
): Promise<User | null> {
  const [rows] = await pool.query(
    `SELECT id,email FROM users WHERE email = '${email}'`,
  );
  return (rows as User[])[0] ?? null;
}
