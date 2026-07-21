import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Dobierz politykę ON DELETE", () => {
  it("blokuje usunięcie klienta z aktywnym zamówieniem", async () => {
    await withMySql("", async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      await connection.query(
        "INSERT INTO customers VALUES (1); INSERT INTO orders VALUES (10,1);",
      );
      await expect(
        connection.query("DELETE FROM customers WHERE id=1"),
      ).rejects.toMatchObject({ code: "ER_ROW_IS_REFERENCED_2" });
    });
  });

  it("usunięcie zamówienia kaskadowo usuwa jego pozycje", async () => {
    await withMySql("", async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      await connection.query(
        "INSERT INTO customers VALUES (1); INSERT INTO orders VALUES (10,1); INSERT INTO order_items VALUES (100,10);",
      );
      await connection.query("DELETE FROM orders WHERE id=10");
      expect(
        await rows(connection, "SELECT * FROM order_items"),
      ).toEqual([]);
    });
  });

  it("pozwala usunąć klienta bez żadnych zamówień", async () => {
    await withMySql("", async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      await connection.query("INSERT INTO customers VALUES (2)");
      await connection.query("DELETE FROM customers WHERE id=2");
      expect(await rows(connection, "SELECT * FROM customers")).toEqual([]);
    });
  });

  it("odrzuca pozycję wskazującą nieistniejące zamówienie", async () => {
    await withMySql("", async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      await expect(
        connection.query("INSERT INTO order_items VALUES (100, 999)"),
      ).rejects.toMatchObject({ code: "ER_NO_REFERENCED_ROW_2" });
    });
  });
});
