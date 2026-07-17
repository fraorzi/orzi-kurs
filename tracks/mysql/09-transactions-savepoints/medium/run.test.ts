import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Savepoint", () => {
  it("cofa krok opcjonalny bez utraty wymaganych zmian", async () => {
    await withMySql(
      "CREATE TABLE inventory(sku VARCHAR(20) PRIMARY KEY, quantity INT NOT NULL CHECK(quantity >= 0)); CREATE TABLE audit_log(id INT AUTO_INCREMENT PRIMARY KEY, kind VARCHAR(40) NOT NULL); INSERT INTO inventory VALUES ('A',5)",
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(
            connection,
            "SELECT quantity FROM inventory WHERE sku='A'",
          ),
        ).toEqual([{ quantity: 3 }]);
        expect(
          await rows(connection, "SELECT kind FROM audit_log ORDER BY id"),
        ).toEqual([{ kind: "inventory_changed" }]);
      },
    );
  });
});
