import type { Connection } from "mysql2/promise";

export async function seedUsers(connection: Connection): Promise<void> {
  await connection.execute(`
    INSERT INTO users(id, name)
    VALUES (101, 'Ada'), (102, 'Grace') AS incoming
    ON DUPLICATE KEY UPDATE name = incoming.name
  `);
}
