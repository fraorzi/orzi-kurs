import { randomUUID } from "node:crypto";
import type { Connection } from "mysql2/promise";
import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

function unique(base: string): string {
  return `${base}_${randomUUID().replaceAll("-", "").slice(0, 8)}`;
}

async function runNamed(
  connection: Connection,
  role: string,
  user: string,
) {
  const sql = readTaskSql(import.meta.url)
    .replaceAll("orzi_app_reader", role)
    .replaceAll("orzi_app_api", user);
  await connection.query(sql);
}

describe("Read-only role", () => {
  it("ogranicza rolę do SELECT na app_data.*, bez innych schematów", async () => {
    const role = unique("orzi_app_reader");
    const user = unique("orzi_app_api");
    await withMySql("", async (connection) => {
      try {
        await runNamed(connection, role, user);
        expect(
          await rows(
            connection,
            `SELECT PRIVILEGE_TYPE AS privilege FROM information_schema.SCHEMA_PRIVILEGES
             WHERE GRANTEE = "'${role}'@'%'" ORDER BY TABLE_SCHEMA, PRIVILEGE_TYPE`,
          ),
        ).toEqual([{ privilege: "SELECT" }]);
      } finally {
        await connection.query(
          `DROP USER IF EXISTS '${user}'@'localhost'; DROP ROLE IF EXISTS '${role}'`,
        );
      }
    });
  });

  it("aktywuje rolę jako domyślną dla konta po logowaniu", async () => {
    const role = unique("orzi_app_reader");
    const user = unique("orzi_app_api");
    await withMySql("", async (connection) => {
      try {
        await runNamed(connection, role, user);
        expect(
          await rows(
            connection,
            `SELECT DEFAULT_ROLE_USER AS roleName FROM mysql.default_roles
             WHERE USER = '${user}' AND HOST = 'localhost'`,
          ),
        ).toEqual([{ roleName: role }]);
      } finally {
        await connection.query(
          `DROP USER IF EXISTS '${user}'@'localhost'; DROP ROLE IF EXISTS '${role}'`,
        );
      }
    });
  });

  it("konto samo nie ma żadnych uprawnień poza USAGE — dostęp płynie z roli", async () => {
    const role = unique("orzi_app_reader");
    const user = unique("orzi_app_api");
    await withMySql("", async (connection) => {
      try {
        await runNamed(connection, role, user);
        expect(
          await rows(
            connection,
            `SELECT PRIVILEGE_TYPE AS privilege FROM information_schema.USER_PRIVILEGES
             WHERE GRANTEE = "'${user}'@'localhost'"`,
          ),
        ).toEqual([{ privilege: "USAGE" }]);
        expect(
          await rows(
            connection,
            `SELECT FROM_USER AS roleName FROM mysql.role_edges
             WHERE TO_USER = '${user}' AND TO_HOST = 'localhost'`,
          ),
        ).toEqual([{ roleName: role }]);
      } finally {
        await connection.query(
          `DROP USER IF EXISTS '${user}'@'localhost'; DROP ROLE IF EXISTS '${role}'`,
        );
      }
    });
  });

  it("nie zostawia roli żadnego globalnego uprawnienia poza domyślnym USAGE", async () => {
    const role = unique("orzi_app_reader");
    const user = unique("orzi_app_api");
    await withMySql("", async (connection) => {
      try {
        await runNamed(connection, role, user);
        expect(
          await rows(
            connection,
            `SELECT PRIVILEGE_TYPE AS privilege FROM information_schema.USER_PRIVILEGES
             WHERE GRANTEE = "'${role}'@'%'"`,
          ),
        ).toEqual([{ privilege: "USAGE" }]);
      } finally {
        await connection.query(
          `DROP USER IF EXISTS '${user}'@'localhost'; DROP ROLE IF EXISTS '${role}'`,
        );
      }
    });
  });
});
