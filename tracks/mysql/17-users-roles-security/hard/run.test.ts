import { randomUUID } from "node:crypto";
import type { Connection } from "mysql2/promise";
import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

function unique(base: string): string {
  return `${base}_${randomUUID().replaceAll("-", "").slice(0, 8)}`;
}

async function seedIncident(connection: Connection, role: string, user: string) {
  await connection.query(
    `CREATE ROLE '${role}';
     CREATE USER '${user}'@'localhost';
     GRANT SELECT, UPDATE, DELETE ON app_data.* TO '${role}';
     GRANT '${role}' TO '${user}'@'localhost';
     SET DEFAULT ROLE '${role}' TO '${user}'@'localhost';`,
  );
}

async function runNamed(connection: Connection, role: string, user: string) {
  const sql = readTaskSql(import.meta.url)
    .replaceAll("orzi_writer", role)
    .replaceAll("orzi_app_api", user);
  await connection.query(sql);
}

describe("Targeted revoke", () => {
  it("usuwa DELETE z roli, zachowując SELECT i UPDATE", async () => {
    const role = unique("orzi_writer");
    const user = unique("orzi_app_api");
    await withMySql("", async (connection) => {
      try {
        await seedIncident(connection, role, user);
        await runNamed(connection, role, user);
        expect(
          await rows(
            connection,
            `SELECT PRIVILEGE_TYPE AS privilege FROM information_schema.SCHEMA_PRIVILEGES
             WHERE GRANTEE = "'${role}'@'%'" AND TABLE_SCHEMA = 'app_data'
             ORDER BY PRIVILEGE_TYPE`,
          ),
        ).toEqual([{ privilege: "SELECT" }, { privilege: "UPDATE" }]);
      } finally {
        await connection.query(
          `DROP USER IF EXISTS '${user}'@'localhost'; DROP ROLE IF EXISTS '${role}'`,
        );
      }
    });
  });

  it("zachowuje rolę i jej członkostwo — konto nadal ma default role", async () => {
    const role = unique("orzi_writer");
    const user = unique("orzi_app_api");
    await withMySql("", async (connection) => {
      try {
        await seedIncident(connection, role, user);
        await runNamed(connection, role, user);
        expect(
          await rows(
            connection,
            `SELECT DEFAULT_ROLE_USER AS roleName FROM mysql.default_roles
             WHERE USER = '${user}' AND HOST = 'localhost'`,
          ),
        ).toEqual([{ roleName: role }]);
        expect(
          await rows(connection, `SELECT COUNT(*) AS n FROM mysql.user WHERE User = '${role}'`),
        ).toEqual([{ n: 1 }]);
      } finally {
        await connection.query(
          `DROP USER IF EXISTS '${user}'@'localhost'; DROP ROLE IF EXISTS '${role}'`,
        );
      }
    });
  });

  it("nie dotyka innego konta dzielącego tę samą rolę", async () => {
    const role = unique("orzi_writer");
    const user = unique("orzi_app_api");
    const otherUser = unique("orzi_batch_job");
    await withMySql("", async (connection) => {
      try {
        await seedIncident(connection, role, user);
        await connection.query(
          `CREATE USER '${otherUser}'@'localhost';
           GRANT '${role}' TO '${otherUser}'@'localhost';
           SET DEFAULT ROLE '${role}' TO '${otherUser}'@'localhost';`,
        );
        await runNamed(connection, role, user);
        expect(
          await rows(
            connection,
            `SELECT DEFAULT_ROLE_USER AS roleName FROM mysql.default_roles
             WHERE USER = '${otherUser}' AND HOST = 'localhost'`,
          ),
        ).toEqual([{ roleName: role }]);
        expect(
          await rows(
            connection,
            `SELECT PRIVILEGE_TYPE AS privilege FROM information_schema.SCHEMA_PRIVILEGES
             WHERE GRANTEE = "'${role}'@'%'" AND TABLE_SCHEMA = 'app_data'
             ORDER BY PRIVILEGE_TYPE`,
          ),
        ).toEqual([{ privilege: "SELECT" }, { privilege: "UPDATE" }]);
      } finally {
        await connection.query(
          `DROP USER IF EXISTS '${user}'@'localhost', '${otherUser}'@'localhost'; DROP ROLE IF EXISTS '${role}'`,
        );
      }
    });
  });

  it("REVOKE jest punktowy — nie usuwa całej roli z innych schematów", async () => {
    const role = unique("orzi_writer");
    const user = unique("orzi_app_api");
    await withMySql("", async (connection) => {
      try {
        await seedIncident(connection, role, user);
        await connection.query(
          `GRANT SELECT ON reporting.* TO '${role}';`,
        );
        await runNamed(connection, role, user);
        expect(
          await rows(
            connection,
            `SELECT TABLE_SCHEMA AS schemaName, PRIVILEGE_TYPE AS privilege
             FROM information_schema.SCHEMA_PRIVILEGES
             WHERE GRANTEE = "'${role}'@'%'" AND TABLE_SCHEMA = 'reporting'`,
          ),
        ).toEqual([{ schemaName: "reporting", privilege: "SELECT" }]);
      } finally {
        await connection.query(
          `DROP USER IF EXISTS '${user}'@'localhost'; DROP ROLE IF EXISTS '${role}'`,
        );
      }
    });
  });
});
