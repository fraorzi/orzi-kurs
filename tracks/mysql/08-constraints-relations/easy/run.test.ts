import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Wymuś dodatnią ilość", () => {
  it("akceptuje najmniejszą poprawną ilość", async () => {
    await withMySql("", async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      await expect(
        connection.query("INSERT INTO order_items VALUES (1, 1)"),
      ).resolves.toBeTruthy();
    });
  });

  it("odrzuca ilość równą zero", async () => {
    await withMySql("", async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      await expect(
        connection.query("INSERT INTO order_items VALUES (2, 0)"),
      ).rejects.toMatchObject({ code: "ER_CHECK_CONSTRAINT_VIOLATED" });
    });
  });

  it("odrzuca ilość ujemną", async () => {
    await withMySql("", async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      await expect(
        connection.query("INSERT INTO order_items VALUES (3, -5)"),
      ).rejects.toMatchObject({ code: "ER_CHECK_CONSTRAINT_VIOLATED" });
    });
  });

  it("odrzuca brak ilości przez NOT NULL, nie przez CHECK", async () => {
    await withMySql("", async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      await expect(
        connection.query(
          "INSERT INTO order_items (id, quantity) VALUES (4, NULL)",
        ),
      ).rejects.toMatchObject({ code: "ER_BAD_NULL_ERROR" });
    });
  });
});
