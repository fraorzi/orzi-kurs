import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Expand/contract rozdzielenia imienia i nazwiska", () => {
  it("utrzymuje starą kolumnę name podczas kompatybilnego backfillu", async () => {
    await withMySql(
      "CREATE TABLE customers(id INT PRIMARY KEY, name VARCHAR(160) NOT NULL); INSERT INTO customers VALUES (1,'Ada Lovelace'),(2,'Grace Hopper')",
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(
            connection,
            "SELECT name,given_name,family_name FROM customers ORDER BY id",
          ),
        ).toEqual([
          { name: "Ada Lovelace", given_name: "Ada", family_name: "Lovelace" },
          { name: "Grace Hopper", given_name: "Grace", family_name: "Hopper" },
        ]);
        expect(
          await rows(
            connection,
            "SELECT COUNT(*) AS count FROM information_schema.columns WHERE table_schema=DATABASE() AND table_name='customers' AND column_name='name'",
          ),
        ).toEqual([{ count: 1 }]);
      },
    );
  });

  it("zachowuje pełne wieloczłonowe nazwisko w family_name", async () => {
    await withMySql(
      "CREATE TABLE customers(id INT PRIMARY KEY, name VARCHAR(160) NOT NULL); INSERT INTO customers VALUES (1,'Maria Sklodowska Curie')",
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(
            connection,
            "SELECT given_name,family_name FROM customers WHERE id=1",
          ),
        ).toEqual([{ given_name: "Maria", family_name: "Sklodowska Curie" }]);
      },
    );
  });

  it("nie wysypuje się na nazwie jednoczłonowej — family_name jest pustym ciągiem, nie NULL", async () => {
    await withMySql(
      "CREATE TABLE customers(id INT PRIMARY KEY, name VARCHAR(160) NOT NULL); INSERT INTO customers VALUES (1,'Cher')",
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(
            connection,
            "SELECT given_name,family_name FROM customers WHERE id=1",
          ),
        ).toEqual([{ given_name: "Cher", family_name: "" }]);
        const column = (
          await rows(
            connection,
            "SELECT IS_NULLABLE AS nullable FROM information_schema.columns WHERE table_schema=DATABASE() AND table_name='customers' AND column_name='family_name'",
          )
        )[0];
        expect(column.nullable).toBe("NO");
      },
    );
  });
});
