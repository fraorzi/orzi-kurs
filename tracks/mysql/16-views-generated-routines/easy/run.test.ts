import { randomUUID } from "node:crypto";
import mysql from "mysql2/promise";
import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE customers (
    id BIGINT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    deleted_at DATETIME NULL
  );
`;

function tcpConnectionTarget(): { host: string; port: number } {
  const url = new URL(process.env.ORZI_MYSQL_URL ?? process.env.MYSQL_URL!);
  return { host: url.hostname, port: url.port ? Number(url.port) : 3306 };
}

describe("Bezpieczny widok kontaktów", () => {
  it("zwraca id i email tylko aktywnych klientów", async () => {
    await withMySql(
      `${schema}
       INSERT INTO customers VALUES
         (1, 'active@example.com', 'hash-1', NULL),
         (2, 'gone@example.com', 'hash-2', '2026-01-01 00:00:00');`,
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(
            connection,
            "SELECT * FROM active_customer_contacts ORDER BY id",
          ),
        ).toEqual([{ id: 1, email: "active@example.com" }]);
      },
    );
  });

  it("nie ujawnia password_hash jako kolumny widoku", async () => {
    await withMySql(
      `${schema}
       INSERT INTO customers VALUES (1, 'active@example.com', 'hash-1', NULL);`,
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        const columns = await rows<{ name: string }>(
          connection,
          `SELECT COLUMN_NAME AS name FROM information_schema.columns
           WHERE table_schema = DATABASE() AND table_name = 'active_customer_contacts'`,
        );
        expect(columns.map((row) => row.name).sort()).toEqual([
          "email",
          "id",
        ]);
      },
    );
  });

  it("deklaruje SQL SECURITY INVOKER zamiast domyślnego DEFINER", async () => {
    await withMySql(schema, async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      expect(
        await rows(
          connection,
          `SELECT SECURITY_TYPE AS securityType FROM information_schema.views
           WHERE table_schema = DATABASE() AND table_name = 'active_customer_contacts'`,
        ),
      ).toEqual([{ securityType: "INVOKER" }]);
    });
  });

  it("odmawia dostępu kontu bez SELECT na customers, mimo GRANT na widoku", async () => {
    await withMySql(
      `${schema}
       INSERT INTO customers VALUES (1, 'active@example.com', 'hash-1', NULL);`,
      async (connection, { database }) => {
        await connection.query(readTaskSql(import.meta.url));
        const username = `orzi16_reader_${randomUUID().replaceAll("-", "").slice(0, 12)}`;
        let lowPrivileged: mysql.Connection | undefined;
        try {
          await connection.query(
            `CREATE USER '${username}'@'%' IDENTIFIED BY 'training-only-pw'`,
          );
          await connection.query(
            `GRANT SELECT ON \`${database}\`.active_customer_contacts TO '${username}'@'%'`,
          );
          lowPrivileged = await mysql.createConnection({
            ...tcpConnectionTarget(),
            user: username,
            password: "training-only-pw",
            database,
          });
          await expect(
            lowPrivileged.query("SELECT * FROM active_customer_contacts"),
          ).rejects.toMatchObject({ code: "ER_VIEW_INVALID" });
        } finally {
          await lowPrivileged?.end();
          await connection.query(`DROP USER IF EXISTS '${username}'@'%'`);
        }
      },
    );
  });
});
