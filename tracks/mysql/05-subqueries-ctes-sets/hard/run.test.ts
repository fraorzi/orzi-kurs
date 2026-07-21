import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE categories (
    id BIGINT PRIMARY KEY,
    parent_id BIGINT NULL,
    name VARCHAR(80) NOT NULL
  );
`;

describe("Przejdź drzewo rekurencyjnym CTE", () => {
  it("zwraca korzeń i całe poddrzewo z poprawną głębokością", async () => {
    await withMySql(
      `${schema}
       INSERT INTO categories VALUES
         (1, NULL, 'Root'),
         (2, 1, 'A'),
         (3, 1, 'B'),
         (4, 2, 'A1'),
         (5, NULL, 'Other');`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1, name: "Root", depth: 0 },
          { id: 2, name: "A", depth: 1 },
          { id: 3, name: "B", depth: 1 },
          { id: 4, name: "A1", depth: 2 },
        ]);
      },
    );
  });

  it("zwraca samą kategorię, gdy nie ma żadnych potomków", async () => {
    await withMySql(
      `${schema}
       INSERT INTO categories VALUES (1, NULL, 'Root');`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1, name: "Root", depth: 0 },
        ]);
      },
    );
  });

  it("nie miesza wyniku z innym, niepowiązanym drzewem kategorii", async () => {
    await withMySql(
      `${schema}
       INSERT INTO categories VALUES
         (1, NULL, 'Root'),
         (2, 1, 'A'),
         (100, NULL, 'OtherRoot'),
         (101, 100, 'OtherChild');`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1, name: "Root", depth: 0 },
          { id: 2, name: "A", depth: 1 },
        ]);
      },
    );
  });

  it("sortuje wynik rosnąco po id, nie po głębokości ani kolejności wstawiania", async () => {
    await withMySql(
      `${schema}
       INSERT INTO categories VALUES
         (1, NULL, 'Root'),
         (10, 1, 'Child10'),
         (2, 10, 'Grandchild2');`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1, name: "Root", depth: 0 },
          { id: 2, name: "Grandchild2", depth: 2 },
          { id: 10, name: "Child10", depth: 1 },
        ]);
      },
    );
  });
});
