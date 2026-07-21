import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE products (
    id BIGINT PRIMARY KEY,
    sku VARCHAR(64) NOT NULL
  );
`;

describe("Generated column jako kanoniczny klucz", () => {
  it("wylicza sku_normalized jako LOWER(TRIM(sku)) przy insert", async () => {
    await withMySql(
      `${schema} INSERT INTO products VALUES (1, '  AbC-1 ');`,
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(
            connection,
            "SELECT sku_normalized AS normalized FROM products WHERE id = 1",
          ),
        ).toEqual([{ normalized: "abc-1" }]);
      },
    );
  });

  it("odrzuca duplikat po normalizacji, mimo różnej wielkości liter i spacji", async () => {
    await withMySql(
      `${schema} INSERT INTO products VALUES (1, '  AbC-1 ');`,
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        await expect(
          connection.query(
            "INSERT INTO products(id, sku) VALUES (2, 'ABC-1')",
          ),
        ).rejects.toMatchObject({ code: "ER_DUP_ENTRY" });
      },
    );
  });

  it("nie myli produktów, których sku normalizuje się różnie", async () => {
    await withMySql(
      `${schema} INSERT INTO products VALUES (1, '  AbC-1 ');`,
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        await expect(
          connection.query(
            "INSERT INTO products(id, sku) VALUES (2, 'ABC-2')",
          ),
        ).resolves.toBeDefined();
        expect(
          await rows(
            connection,
            "SELECT id, sku_normalized AS normalized FROM products ORDER BY id",
          ),
        ).toEqual([
          { id: 1, normalized: "abc-1" },
          { id: 2, normalized: "abc-2" },
        ]);
      },
    );
  });

  it("przelicza sku_normalized po UPDATE bazowej kolumny sku", async () => {
    await withMySql(
      `${schema} INSERT INTO products VALUES (1, '  AbC-1 ');`,
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        await connection.query(
          "UPDATE products SET sku = ' Other ' WHERE id = 1",
        );
        expect(
          await rows(
            connection,
            "SELECT sku_normalized AS normalized FROM products WHERE id = 1",
          ),
        ).toEqual([{ normalized: "other" }]);
      },
    );
  });

  it("materializuje sku_normalized jako STORED GENERATED, nie VIRTUAL", async () => {
    await withMySql(
      `${schema} INSERT INTO products VALUES (1, '  AbC-1 ');`,
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(
            connection,
            `SELECT EXTRA AS extra FROM information_schema.columns
             WHERE table_schema = DATABASE() AND table_name = 'products'
               AND column_name = 'sku_normalized'`,
          ),
        ).toEqual([{ extra: "STORED GENERATED" }]);
      },
    );
  });
});
