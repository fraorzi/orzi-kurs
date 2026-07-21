import type { Connection } from "mysql2/promise";

export async function migrateUserEmails(connection: Connection): Promise<void> {
  await connection.query(
    "ALTER TABLE users ADD COLUMN email_normalized VARCHAR(255) NULL",
  );
  await connection.query(
    "UPDATE users SET email_normalized = LOWER(TRIM(email))",
  );
  await connection.query(`
    ALTER TABLE users
      MODIFY email_normalized VARCHAR(255) NOT NULL,
      ADD CONSTRAINT uq_users_email_normalized UNIQUE(email_normalized)
  `);
}
