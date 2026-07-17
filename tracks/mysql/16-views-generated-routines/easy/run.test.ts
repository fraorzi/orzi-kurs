import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Bezpieczny view", () => {
  it("ma invoker security i minimalny kontrakt kolumn", async () => {
    await withMySql(
      "CREATE TABLE customers(id INT PRIMARY KEY, email VARCHAR(255), password_hash VARCHAR(255), deleted_at DATETIME NULL); INSERT INTO customers VALUES (1,'active@example.com','secret',NULL),(2,'gone@example.com','secret','2026-01-01')",
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(connection, "SELECT * FROM active_customer_contacts"),
        ).toEqual([{ id: 1, email: "active@example.com" }]);
        expect(
          await rows(
            connection,
            "SELECT SECURITY_TYPE AS securityType FROM information_schema.views WHERE table_schema=DATABASE() AND table_name='active_customer_contacts'",
          ),
        ).toEqual([{ securityType: "INVOKER" }]);
      },
    );
  });
});
