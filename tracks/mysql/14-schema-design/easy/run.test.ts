import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Lookup table", () => {
  it("egzekwuje słownik i kontrolowane zachowanie relacji", async () => {
    await withMySql("", async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      await connection.query(
        "INSERT INTO ticket_statuses VALUES ('open','Open'); INSERT INTO tickets VALUES (1,'open')",
      );
      await expect(
        connection.query("INSERT INTO tickets VALUES (2,'missing')"),
      ).rejects.toMatchObject({ code: "ER_NO_REFERENCED_ROW_2" });
      await expect(
        connection.query("DELETE FROM ticket_statuses WHERE code='open'"),
      ).rejects.toMatchObject({ code: "ER_ROW_IS_REFERENCED_2" });
      await connection.query(
        "UPDATE ticket_statuses SET code='active' WHERE code='open'",
      );
      expect(
        await rows(connection, "SELECT status FROM tickets WHERE id=1"),
      ).toEqual([{ status: "active" }]);
    });
  });
});
