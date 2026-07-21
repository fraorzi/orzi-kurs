import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE inventory (
    sku VARCHAR(20) PRIMARY KEY,
    quantity INT NOT NULL CHECK (quantity >= 0)
  );
  CREATE TABLE audit_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kind VARCHAR(40) NOT NULL
  );
`;

describe("Savepoint", () => {
  it("cofa krok opcjonalny bez utraty wymaganych zmian", async () => {
    await withMySql(
      `${schema}
       INSERT INTO inventory VALUES ('A', 5);`,
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(connection, "SELECT quantity FROM inventory WHERE sku='A'"),
        ).toEqual([{ quantity: 3 }]);
        expect(
          await rows(connection, "SELECT kind FROM audit_log ORDER BY id"),
        ).toEqual([{ kind: "inventory_changed" }]);
      },
    );
  });

  it("liczy ubytek zapasu arytmetycznie, niezależnie od stanu początkowego", async () => {
    await withMySql(
      `${schema}
       INSERT INTO inventory VALUES ('A', 10);`,
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(connection, "SELECT quantity FROM inventory WHERE sku='A'"),
        ).toEqual([{ quantity: 8 }]);
      },
    );
  });

  it("telemetria nigdy nie trafia do audit_log", async () => {
    await withMySql(
      `${schema}
       INSERT INTO inventory VALUES ('A', 5);`,
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(
            connection,
            "SELECT COUNT(*) AS count FROM audit_log WHERE kind = 'telemetry'",
          ),
        ).toEqual([{ count: 0 }]);
      },
    );
  });

  it("nie zostawia połączenia w otwartej, niezakończonej transakcji", async () => {
    await withMySql(
      `${schema}
       INSERT INTO inventory VALUES ('A', 5);`,
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(
            connection,
            "SELECT COUNT(*) AS count FROM information_schema.innodb_trx WHERE trx_mysql_thread_id = CONNECTION_ID()",
          ),
        ).toEqual([{ count: 0 }]);
      },
    );
  });
});
