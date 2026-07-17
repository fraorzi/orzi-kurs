import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Obsługa błędu transakcji", () => {
  it("wycofuje wcześniejszą zmianę i propaguje błąd", async () => {
    await withMySql(
      "CREATE TABLE accounts(id INT PRIMARY KEY, balance DECIMAL(10,2) NOT NULL CHECK(balance >= 0)); CREATE TABLE ledger(id INT AUTO_INCREMENT PRIMARY KEY, from_id INT, to_id INT, amount DECIMAL(10,2)); INSERT INTO accounts VALUES (1,20.00),(2,10.00)",
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        await expect(
          connection.query("CALL transfer_funds(1,2,50.00)"),
        ).rejects.toMatchObject({ code: "ER_CHECK_CONSTRAINT_VIOLATED" });
        expect(
          await rows(
            connection,
            "SELECT id, balance FROM accounts ORDER BY id",
          ),
        ).toEqual([
          { id: 1, balance: "20.00" },
          { id: 2, balance: "10.00" },
        ]);
        expect(
          await rows(connection, "SELECT COUNT(*) AS count FROM ledger"),
        ).toEqual([{ count: 0 }]);
      },
    );
  });
});
