import { randomUUID } from "node:crypto";
import type { Connection } from "mysql2/promise";
import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

function unique(base: string): string {
  return `${base}_${randomUUID().replaceAll("-", "").slice(0, 8)}`;
}

async function runNamed(connection: Connection, user: string) {
  const sql = readTaskSql(import.meta.url).replaceAll("orzi_service", user);
  await connection.query(sql);
}

describe("Service account", () => {
  it("wymusza SSL i limit równoległych połączeń", async () => {
    const user = unique("orzi_service");
    await withMySql("", async (connection) => {
      try {
        await runNamed(connection, user);
        expect(
          await rows(
            connection,
            `SELECT ssl_type AS sslType, max_user_connections AS maxConnections
             FROM mysql.user WHERE User = '${user}' AND Host = 'localhost'`,
          ),
        ).toEqual([{ sslType: "ANY", maxConnections: 5 }]);
      } finally {
        await connection.query(`DROP USER IF EXISTS '${user}'@'localhost'`);
      }
    });
  });

  it("nadaje wyłącznie SELECT, INSERT, UPDATE na app_data — bez DELETE", async () => {
    const user = unique("orzi_service");
    await withMySql("", async (connection) => {
      try {
        await runNamed(connection, user);
        expect(
          await rows(
            connection,
            `SELECT PRIVILEGE_TYPE AS privilege FROM information_schema.SCHEMA_PRIVILEGES
             WHERE GRANTEE = "'${user}'@'localhost'" AND TABLE_SCHEMA = 'app_data'
             ORDER BY PRIVILEGE_TYPE`,
          ),
        ).toEqual([
          { privilege: "INSERT" },
          { privilege: "SELECT" },
          { privilege: "UPDATE" },
        ]);
      } finally {
        await connection.query(`DROP USER IF EXISTS '${user}'@'localhost'`);
      }
    });
  });

  it("nie deleguje uprawnień dalej i nie zachowuje globalnego dostępu", async () => {
    const user = unique("orzi_service");
    await withMySql("", async (connection) => {
      try {
        await runNamed(connection, user);
        expect(
          await rows(
            connection,
            `SELECT IS_GRANTABLE AS isGrantable FROM information_schema.SCHEMA_PRIVILEGES
             WHERE GRANTEE = "'${user}'@'localhost'" AND TABLE_SCHEMA = 'app_data'`,
          ),
        ).toEqual([
          { isGrantable: "NO" },
          { isGrantable: "NO" },
          { isGrantable: "NO" },
        ]);
        expect(
          await rows(
            connection,
            `SELECT PRIVILEGE_TYPE AS privilege FROM information_schema.USER_PRIVILEGES
             WHERE GRANTEE = "'${user}'@'localhost'"`,
          ),
        ).toEqual([{ privilege: "USAGE" }]);
      } finally {
        await connection.query(`DROP USER IF EXISTS '${user}'@'localhost'`);
      }
    });
  });

  it("wymusza rotację hasła zamiast hasła bezterminowego", async () => {
    const user = unique("orzi_service");
    await withMySql("", async (connection) => {
      try {
        await runNamed(connection, user);
        expect(
          await rows(
            connection,
            `SELECT password_lifetime AS lifetime FROM mysql.user
             WHERE User = '${user}' AND Host = 'localhost'`,
          ),
        ).toEqual([{ lifetime: 90 }]);
      } finally {
        await connection.query(`DROP USER IF EXISTS '${user}'@'localhost'`);
      }
    });
  });
});
