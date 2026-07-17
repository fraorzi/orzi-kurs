import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Historyczny snapshot", () => {
  it("zachowuje dane transakcji po zmianie profilu klienta", async () => {
    await withMySql("", async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      await connection.query(
        "INSERT INTO customers VALUES (1,'old@example.com'); INSERT INTO orders(id,public_id,customer_id,customer_email_snapshot,total) VALUES (1,'01JABCDEFGHIJKLMNPQRSTUVWX',1,'old@example.com',19.99); UPDATE customers SET email='new@example.com' WHERE id=1",
      );
      expect(
        await rows(
          connection,
          "SELECT customer_email_snapshot AS email,total FROM orders WHERE id=1",
        ),
      ).toEqual([{ email: "old@example.com", total: "19.99" }]);
      await expect(
        connection.query(
          "INSERT INTO orders(id,public_id,customer_id,customer_email_snapshot,total) VALUES (2,'01JABCDEFGHIJKLMNPQRSTUVWX',1,'x',1)",
        ),
      ).rejects.toMatchObject({ code: "ER_DUP_ENTRY" });
      await expect(
        connection.query(
          "INSERT INTO orders(id,public_id,customer_id,customer_email_snapshot,total) VALUES (3,'01JZZZZZZZZZZZZZZZZZZZZZZ',1,'x',-1)",
        ),
      ).rejects.toMatchObject({ code: "ER_CHECK_CONSTRAINT_VIOLATED" });
    });
  });
});
