import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE users (
    id BIGINT PRIMARY KEY,
    email VARCHAR(120) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`;

describe("Wstaw rekord z jawnymi kolumnami", () => {
  it("wstawia użytkownika z created_at wypełnionym aktualnym czasem", async () => {
    await withMySql(schema, async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      expect(
        await rows(
          connection,
          "SELECT id, email, TIMESTAMPDIFF(SECOND, created_at, NOW()) < 5 AS created_recently FROM users",
        ),
      ).toEqual([{ id: 1, email: "a@example.com", created_recently: 1 }]);
    });
  });

  it("działa niezależnie od fizycznej kolejności kolumn w tabeli", async () => {
    await withMySql(
      `CREATE TABLE users (
         email VARCHAR(120) NOT NULL UNIQUE,
         created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
         id BIGINT PRIMARY KEY
       );`,
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(connection, "SELECT id, email FROM users"),
        ).toEqual([{ id: 1, email: "a@example.com" }]);
      },
    );
  });

  it("nie narusza istniejącego wiersza innego użytkownika", async () => {
    await withMySql(
      `${schema}
       INSERT INTO users (id, email) VALUES (2, 'existing@example.com');`,
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(connection, "SELECT id, email FROM users ORDER BY id"),
        ).toEqual([
          { id: 1, email: "a@example.com" },
          { id: 2, email: "existing@example.com" },
        ]);
      },
    );
  });
});
