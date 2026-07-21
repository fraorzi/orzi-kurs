import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE employees (
    id BIGINT PRIMARY KEY,
    email VARCHAR(120) NOT NULL,
    manager_id BIGINT NULL
  );
`;

describe("Pokaż hierarchię pracowników", () => {
  it("zachowuje CEO bez managera z manager_email NULL", async () => {
    await withMySql(
      `${schema}
       INSERT INTO employees VALUES
         (1, 'ceo@example.com', NULL),
         (2, 'lead@example.com', 1),
         (3, 'dev@example.com', 2);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { email: "ceo@example.com", manager_email: null },
          { email: "lead@example.com", manager_email: "ceo@example.com" },
          { email: "dev@example.com", manager_email: "lead@example.com" },
        ]);
      },
    );
  });

  it("pokazuje tylko bezpośredniego managera, nie cały łańcuch przełożonych", async () => {
    await withMySql(
      `${schema}
       INSERT INTO employees VALUES
         (1, 'ceo@example.com', NULL),
         (2, 'vp@example.com', 1),
         (3, 'lead@example.com', 2),
         (4, 'dev@example.com', 3);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { email: "ceo@example.com", manager_email: null },
          { email: "vp@example.com", manager_email: "ceo@example.com" },
          { email: "lead@example.com", manager_email: "vp@example.com" },
          { email: "dev@example.com", manager_email: "lead@example.com" },
        ]);
      },
    );
  });

  it("zachowuje pracownika z manager_id wskazującym na nieistniejący rekord", async () => {
    await withMySql(
      `${schema}
       INSERT INTO employees VALUES
         (1, 'ceo@example.com', NULL),
         (2, 'orphan@example.com', 999);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { email: "ceo@example.com", manager_email: null },
          { email: "orphan@example.com", manager_email: null },
        ]);
      },
    );
  });

  it("sortuje wynik rosnąco po id pracownika niezależnie od kolejności wstawiania", async () => {
    await withMySql(
      `${schema}
       INSERT INTO employees VALUES
         (3, 'dev@example.com', 1),
         (1, 'ceo@example.com', NULL),
         (2, 'lead@example.com', 1);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { email: "ceo@example.com", manager_email: null },
          { email: "lead@example.com", manager_email: "ceo@example.com" },
          { email: "dev@example.com", manager_email: "ceo@example.com" },
        ]);
      },
    );
  });
});
