import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Dirty-data migration", () => {
  it("kanonizuje legacy rows przed wymuszeniem unique", async () => {
    await withMySql(
      "CREATE TABLE users(id INT PRIMARY KEY,email VARCHAR(255)); INSERT INTO users VALUES (1,'Ada@Example.com'),(2,' ada@example.COM '),(3,'grace@example.com')",
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(
            connection,
            "SELECT id,email_normalized AS normalized FROM users ORDER BY id",
          ),
        ).toEqual([
          { id: 1, normalized: "ada@example.com" },
          { id: 3, normalized: "grace@example.com" },
        ]);
        await expect(
          connection.query(
            "INSERT INTO users(id,email) VALUES (4,' ADA@example.com ')",
          ),
        ).rejects.toMatchObject({ code: "ER_DUP_ENTRY" });
      },
    );
  });

  it("grupa z trzema duplikatami zostawia dokładnie jeden — najmniejsze id", async () => {
    await withMySql(
      "CREATE TABLE users(id INT PRIMARY KEY,email VARCHAR(255)); INSERT INTO users VALUES (5,'Ada@Example.com'),(2,'ADA@EXAMPLE.COM'),(9,' ada@example.com ')",
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(connection, "SELECT id FROM users ORDER BY id"),
        ).toEqual([{ id: 2 }]);
      },
    );
  });

  it("nie rusza wierszy bez duplikatu — inne kolumny kanonicznego rekordu przetrwają", async () => {
    await withMySql(
      `CREATE TABLE users(id INT PRIMARY KEY, email VARCHAR(255), name VARCHAR(80));
       INSERT INTO users VALUES
         (1,'Ada@Example.com','Ada Lovelace'),
         (2,' ada@example.COM ','Ada Duplicate'),
         (3,'grace@example.com','Grace Hopper');`,
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(
            connection,
            "SELECT id, name FROM users ORDER BY id",
          ),
        ).toEqual([
          { id: 1, name: "Ada Lovelace" },
          { id: 3, name: "Grace Hopper" },
        ]);
      },
    );
  });

  it("bez duplikatów żaden wiersz nie znika, a kolumna jest wypełniona", async () => {
    await withMySql(
      "CREATE TABLE users(id INT PRIMARY KEY,email VARCHAR(255)); INSERT INTO users VALUES (1,'ada@example.com'),(2,'grace@example.com'),(3,'turing@example.com')",
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(
            connection,
            "SELECT id, email_normalized AS normalized FROM users ORDER BY id",
          ),
        ).toEqual([
          { id: 1, normalized: "ada@example.com" },
          { id: 2, normalized: "grace@example.com" },
          { id: 3, normalized: "turing@example.com" },
        ]);
      },
    );
  });
});
