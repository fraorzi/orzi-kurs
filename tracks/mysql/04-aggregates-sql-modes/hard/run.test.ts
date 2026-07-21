import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE readings (
    id BIGINT PRIMARY KEY,
    device_id BIGINT NOT NULL,
    recorded_at DATETIME NOT NULL,
    value INT NOT NULL
  );
`;

describe("Wybierz rekord ostatniego zdarzenia", () => {
  it("zwraca dokładny wiersz najnowszego zdarzenia per urządzenie", async () => {
    await withMySql(
      `${schema}
       INSERT INTO readings VALUES
         (1, 1, '2026-01-01 00:00:00', 10),
         (2, 1, '2026-01-02 00:00:00', 20),
         (3, 2, '2026-01-01 00:00:00', 30);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { device_id: 1, recorded_at: "2026-01-02 00:00:00", value: 20 },
          { device_id: 2, recorded_at: "2026-01-01 00:00:00", value: 30 },
        ]);
      },
    );
  });

  it("wybiera najnowszy odczyt niezależnie od kolejności wstawiania wierszy", async () => {
    await withMySql(
      `${schema}
       INSERT INTO readings VALUES
         (1, 1, '2026-01-05 12:00:00', 999),
         (2, 1, '2026-01-10 08:00:00', 111),
         (3, 1, '2026-01-01 00:00:00', 555);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { device_id: 1, recorded_at: "2026-01-10 08:00:00", value: 111 },
        ]);
      },
    );
  });

  it("obsługuje urządzenie z pojedynczym odczytem", async () => {
    await withMySql(
      `${schema}
       INSERT INTO readings VALUES (1, 7, '2026-02-01 09:30:00', 42);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { device_id: 7, recorded_at: "2026-02-01 09:30:00", value: 42 },
        ]);
      },
    );
  });

  it("sortuje wynik rosnąco po device_id niezależnie od kolejności wstawiania", async () => {
    await withMySql(
      `${schema}
       INSERT INTO readings VALUES
         (1, 5, '2026-01-01 00:00:00', 1),
         (2, 2, '2026-01-01 00:00:00', 2),
         (3, 9, '2026-01-01 00:00:00', 3);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { device_id: 2, recorded_at: "2026-01-01 00:00:00", value: 2 },
          { device_id: 5, recorded_at: "2026-01-01 00:00:00", value: 1 },
          { device_id: 9, recorded_at: "2026-01-01 00:00:00", value: 3 },
        ]);
      },
    );
  });
});
