import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE users (
    id BIGINT PRIMARY KEY,
    email VARCHAR(120) NOT NULL,
    active BOOLEAN NOT NULL
  );
`;

describe("Wybierz aktywnych użytkowników", () => {
  it("zwraca aktywnych użytkowników rosnąco po id", async () => {
    await withMySql(
      `${schema}
       INSERT INTO users VALUES
         (3, 'c@example.com', TRUE),
         (1, 'a@example.com', TRUE),
         (2, 'b@example.com', FALSE);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1, email: "a@example.com" },
          { id: 3, email: "c@example.com" },
        ]);
      },
    );
  });

  it("zwraca pusty wynik, gdy żadne konto nie jest aktywne", async () => {
    await withMySql(
      `${schema}
       INSERT INTO users VALUES
         (1, 'a@example.com', FALSE),
         (2, 'b@example.com', FALSE);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual(
          [],
        );
      },
    );
  });

  it("sortuje po id, a nie po kolejności wstawiania", async () => {
    await withMySql(
      `${schema}
       INSERT INTO users VALUES
         (9, 'i@example.com', TRUE),
         (5, 'e@example.com', TRUE),
         (7, 'g@example.com', TRUE);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 5, email: "e@example.com" },
          { id: 7, email: "g@example.com" },
          { id: 9, email: "i@example.com" },
        ]);
      },
    );
  });
});
