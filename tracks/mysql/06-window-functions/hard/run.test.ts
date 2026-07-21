import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE payments (
    id BIGINT PRIMARY KEY,
    paid_at DATETIME NOT NULL,
    amount DECIMAL(10,2) NOT NULL
  );
`;

describe("Policz jawny running total", () => {
  it("liczy running total narastająco po paid_at i id", async () => {
    await withMySql(
      `${schema}
       INSERT INTO payments VALUES
         (1, '2026-01-01 10:00:00', 10),
         (2, '2026-01-01 11:00:00', 20),
         (3, '2026-01-02 10:00:00', 5);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1, running_total: "10.00" },
          { id: 2, running_total: "30.00" },
          { id: 3, running_total: "35.00" },
        ]);
      },
    );
  });

  it("przy remisie paid_at rośnie pojedynczo po id, nie po całej grupie peer", async () => {
    await withMySql(
      `${schema}
       INSERT INTO payments VALUES
         (1, '2026-01-01 10:00:00', 10),
         (2, '2026-01-01 10:00:00', 20),
         (3, '2026-01-01 10:00:00', 5);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1, running_total: "10.00" },
          { id: 2, running_total: "30.00" },
          { id: 3, running_total: "35.00" },
        ]);
      },
    );
  });

  it("zwraca pusty wynik, gdy nie ma płatności", async () => {
    await withMySql(schema, async (connection) => {
      expect(await rows(connection, readTaskSql(import.meta.url))).toEqual(
        [],
      );
    });
  });

  it("pojedyncza płatność zwraca running_total równy jej kwocie jako string", async () => {
    await withMySql(
      `${schema}
       INSERT INTO payments VALUES (1, '2026-01-01 10:00:00', 12.50);`,
      async (connection) => {
        expect(await rows(connection, readTaskSql(import.meta.url))).toEqual([
          { id: 1, running_total: "12.50" },
        ]);
      },
    );
  });
});
