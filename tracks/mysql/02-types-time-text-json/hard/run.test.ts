import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE profiles (
    id BIGINT PRIMARY KEY,
    settings JSON NOT NULL
  );
`;

describe("Czytaj typowany fragment JSON", () => {
  it("zwraca czysty tekst języka, gdy wartość jest stringiem JSON", async () => {
    await withMySql(
      `${schema}
       INSERT INTO profiles VALUES
         (1, '{"notifications":{"language":"pl"}}');`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1, language: "pl" },
        ]);
      },
    );
  });

  it("pomija rekord, gdy wartość jest liczbą JSON", async () => {
    await withMySql(
      `${schema}
       INSERT INTO profiles VALUES
         (1, '{"notifications":{"language":"pl"}}'),
         (2, '{"notifications":{"language":7}}');`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1, language: "pl" },
        ]);
      },
    );
  });

  it("pomija rekord, gdy ścieżka do języka nie istnieje w dokumencie", async () => {
    await withMySql(
      `${schema}
       INSERT INTO profiles VALUES
         (1, '{"notifications":{"language":"pl"}}'),
         (2, '{}');`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1, language: "pl" },
        ]);
      },
    );
  });

  it("pomija rekord, gdy wartość to literał JSON null, nie brak klucza", async () => {
    await withMySql(
      `${schema}
       INSERT INTO profiles VALUES
         (1, '{"notifications":{"language":"pl"}}'),
         (2, '{"notifications":{"language":null}}');`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1, language: "pl" },
        ]);
      },
    );
  });

  it("pomija rekord z zagnieżdżonym obiektem zamiast tekstu", async () => {
    await withMySql(
      `${schema}
       INSERT INTO profiles VALUES
         (1, '{"notifications":{"language":"pl"}}'),
         (2, '{"notifications":{"language":{"code":"pl"}}}');`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1, language: "pl" },
        ]);
      },
    );
  });
});
