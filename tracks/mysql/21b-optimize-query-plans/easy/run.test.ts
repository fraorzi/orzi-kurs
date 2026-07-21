import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schemaWide = `
  CREATE TABLE events(id INT PRIMARY KEY,created_at DATETIME NOT NULL,payload VARCHAR(20),INDEX ix_events_created(created_at));
  SET SESSION cte_max_recursion_depth=1000;
  INSERT INTO events WITH RECURSIVE seq AS (SELECT 1 n UNION ALL SELECT n+1 FROM seq WHERE n<720)
  SELECT n,TIMESTAMP('2026-01-01') + INTERVAL n HOUR,CONCAT('e',n) FROM seq;
`;

describe("Sargowalny zakres", () => {
  it("zachowuje dokładny wynik", async () => {
    await withMySql(schemaWide, async (connection) => {
      const [result] = await connection.query(readTaskSql(import.meta.url));
      expect((result as Array<{ id: number }>).map((row) => row.id)).toEqual(
        Array.from({ length: 24 }, (_, index) => index + 216),
      );
    });
  });

  it("respektuje granicę dnia — wiersz o północy następnego dnia jest wykluczony", async () => {
    await withMySql(
      `CREATE TABLE events(id INT PRIMARY KEY,created_at DATETIME NOT NULL,payload VARCHAR(20),INDEX ix_events_created(created_at));
       INSERT INTO events VALUES
         (1,'2026-01-09 23:59:59','before'),
         (2,'2026-01-10 00:00:00','start'),
         (3,'2026-01-10 12:00:00','middle'),
         (4,'2026-01-10 23:59:59','end'),
         (5,'2026-01-11 00:00:00','next-day');`,
      async (connection) => {
        const [result] = await connection.query(readTaskSql(import.meta.url));
        expect((result as Array<{ id: number }>).map((row) => row.id)).toEqual([
          2, 3, 4,
        ]);
      },
    );
  });

  it("[quality] używa range access po ix_events_created", async () => {
    await withMySql(schemaWide, async (connection) => {
      const sql = readTaskSql(import.meta.url).trim().replace(/;$/, "");
      const plan = await rows(connection, `EXPLAIN ${sql}`);
      expect(plan[0].key).toBe("ix_events_created");
      expect(plan[0].type).toBe("range");
    });
  });

  it("[quality] przegląda rząd wielkości wierszy jednego dnia, nie całą tabelę", async () => {
    await withMySql(schemaWide, async (connection) => {
      const sql = readTaskSql(import.meta.url).trim().replace(/;$/, "");
      const plan = await rows(connection, `EXPLAIN ${sql}`);
      expect(Number(plan[0].rows)).toBeLessThanOrEqual(60);
    });
  });
});
