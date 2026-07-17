import type { Connection } from "mysql2/promise";

export async function migrateUserEmails(connection: Connection): Promise<void> {
  await connection.query(
    "ALTER TABLE users ADD COLUMN email_normalized VARCHAR(255) NULL",
  );
}
