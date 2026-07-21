import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE readings (
    id BIGINT PRIMARY KEY,
    sensor_id BIGINT NOT NULL,
    measured_at DATETIME NOT NULL,
    value INT NOT NULL
  );
`;

describe("Porównaj z poprzednim pomiarem", () => {
  it("liczy deltę względem poprzedniego pomiaru tego samego sensora", async () => {
    await withMySql(
      `${schema}
       INSERT INTO readings VALUES
         (1, 1, '2026-01-01 10:00:00', 10),
         (2, 1, '2026-01-02 10:00:00', 13),
         (3, 2, '2026-01-01 10:00:00', 20);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1, value: 10, delta: null },
          { id: 2, value: 13, delta: 3 },
          { id: 3, value: 20, delta: null },
        ]);
      },
    );
  });

  it("nie miesza serii dwóch sensorów mimo przeplecionego czasu", async () => {
    await withMySql(
      `${schema}
       INSERT INTO readings VALUES
         (1, 1, '2026-01-01 09:00:00', 10),
         (2, 2, '2026-01-01 10:00:00', 100),
         (3, 1, '2026-01-01 11:00:00', 16),
         (4, 2, '2026-01-01 12:00:00', 90);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1, value: 10, delta: null },
          { id: 2, value: 100, delta: null },
          { id: 3, value: 16, delta: 6 },
          { id: 4, value: 90, delta: -10 },
        ]);
      },
    );
  });

  it("rozstrzyga remis identycznego measured_at rosnąco po id", async () => {
    await withMySql(
      `${schema}
       INSERT INTO readings VALUES
         (5, 3, '2026-01-01 10:00:00', 4),
         (6, 3, '2026-01-01 10:00:00', 9);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 5, value: 4, delta: null },
          { id: 6, value: 9, delta: 5 },
        ]);
      },
    );
  });

  it("zwraca pusty wynik, gdy brak odczytów", async () => {
    await withMySql(schema, async (connection) => {
      expect(await rows(connection, readTaskSql(import.meta.url))).toEqual(
        [],
      );
    });
  });
});
