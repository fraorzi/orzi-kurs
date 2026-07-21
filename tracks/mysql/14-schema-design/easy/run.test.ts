import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Znormalizowany słownik statusów", () => {
  it("wymaga istniejącego statusu — FK blokuje ticket z nieznanym kodem", async () => {
    await withMySql("", async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      await connection.query(
        "INSERT INTO ticket_statuses VALUES ('open','Open')",
      );
      await connection.query("INSERT INTO tickets VALUES (1,'open')");
      await expect(
        connection.query("INSERT INTO tickets VALUES (2,'missing')"),
      ).rejects.toMatchObject({ code: "ER_NO_REFERENCED_ROW_2" });
    });
  });

  it("chroni słownik przed usunięciem statusu, który wciąż jest używany", async () => {
    await withMySql("", async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      await connection.query(
        "INSERT INTO ticket_statuses VALUES ('open','Open')",
      );
      await connection.query("INSERT INTO tickets VALUES (1,'open')");
      await expect(
        connection.query("DELETE FROM ticket_statuses WHERE code='open'"),
      ).rejects.toMatchObject({ code: "ER_ROW_IS_REFERENCED_2" });
    });
  });

  it("propaguje zmianę kodu statusu do wszystkich ticketów (ON UPDATE CASCADE)", async () => {
    await withMySql("", async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      await connection.query(
        "INSERT INTO ticket_statuses VALUES ('open','Open')",
      );
      await connection.query("INSERT INTO tickets VALUES (1,'open')");
      await connection.query(
        "UPDATE ticket_statuses SET code='active' WHERE code='open'",
      );
      expect(
        await rows(connection, "SELECT status FROM tickets WHERE id=1"),
      ).toEqual([{ status: "active" }]);
    });
  });

  it("pozwala usunąć status, który nie jest przypisany do żadnego ticketa", async () => {
    await withMySql("", async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      await connection.query(
        "INSERT INTO ticket_statuses VALUES ('open','Open'), ('closed','Closed')",
      );
      await connection.query("INSERT INTO tickets VALUES (1,'open')");
      await connection.query("DELETE FROM ticket_statuses WHERE code='closed'");
      expect(
        await rows(connection, "SELECT code FROM ticket_statuses ORDER BY code"),
      ).toEqual([{ code: "open" }]);
    });
  });
});
