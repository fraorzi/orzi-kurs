import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Generated column", () => {
  it("wylicza, aktualizuje i indeksuje wartość kanoniczną", async () => {
    await withMySql(
      "CREATE TABLE products(id INT PRIMARY KEY, sku VARCHAR(64) NOT NULL); INSERT INTO products VALUES (1,'  AbC-1 ')",
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(
            connection,
            "SELECT sku_normalized AS normalized FROM products WHERE id=1",
          ),
        ).toEqual([{ normalized: "abc-1" }]);
        await expect(
          connection.query("INSERT INTO products(id,sku) VALUES (2,'ABC-1')"),
        ).rejects.toMatchObject({ code: "ER_DUP_ENTRY" });
        await connection.query("UPDATE products SET sku=' Other ' WHERE id=1");
        expect(
          await rows(
            connection,
            "SELECT sku_normalized AS normalized FROM products WHERE id=1",
          ),
        ).toEqual([{ normalized: "other" }]);
      },
    );
  });
});
