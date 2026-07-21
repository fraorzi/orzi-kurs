import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

async function pageIds(sql: string): Promise<number[]> {
  return withMySql(sql, async (connection) => {
    const [raw] = await connection.query(readTaskSql(import.meta.url));
    const results =
      Array.isArray(raw) && raw.some(Array.isArray)
        ? raw.findLast(Array.isArray)
        : raw;
    return (results as Array<{ id: number }>).map((row) => row.id);
  });
}

describe("Tenantowy keyset z podpierającym indeksem", () => {
  it("filtruje tenant_id razem z kursorem — post innego najemcy w oknie czasowym nie przecieka", async () => {
    const ids = await pageIds(`
      CREATE TABLE posts (
        id BIGINT PRIMARY KEY,
        tenant_id INT NOT NULL,
        created_at DATETIME NOT NULL,
        title VARCHAR(40)
      );
      INSERT INTO posts VALUES
        (1, 1, '2026-01-04 10:00:00', 'p1'),
        (2, 1, '2026-01-04 10:00:00', 'p2'),
        (3, 1, '2026-01-03 10:00:00', 'p3'),
        (4, 1, '2026-01-02 10:00:00', 'p4'),
        (5, 1, '2026-01-02 10:00:00', 'p5'),
        (6, 1, '2026-01-01 10:00:00', 'p6'),
        (7, 2, '2026-01-04 10:00:00', 'other'),
        (9, 2, '2026-01-03 09:00:00', 'tenant-leak');
    `);
    expect(ids).toEqual([1, 3, 5]);
  });

  it("tworzy indeks tenant_id, created_at, id w tej kolejności", async () => {
    await withMySql(
      `
        CREATE TABLE posts (
          id BIGINT PRIMARY KEY,
          tenant_id INT NOT NULL,
          created_at DATETIME NOT NULL,
          title VARCHAR(40)
        );
      `,
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        const columns = await rows(
          connection,
          `SELECT COLUMN_NAME AS columnName FROM information_schema.statistics
           WHERE table_schema = DATABASE() AND table_name = 'posts'
             AND index_name = 'ix_posts_feed' ORDER BY SEQ_IN_INDEX`,
        );
        expect(columns.map((c) => c.columnName)).toEqual([
          "tenant_id",
          "created_at",
          "id",
        ]);
      },
    );
  });

  it("najemca bez pasujących postów dostaje pustą stronę, nawet gdy inni mają dane", async () => {
    const ids = await pageIds(`
      CREATE TABLE posts (
        id BIGINT PRIMARY KEY,
        tenant_id INT NOT NULL,
        created_at DATETIME NOT NULL,
        title VARCHAR(40)
      );
      INSERT INTO posts VALUES
        (7, 2, '2026-01-01 10:00:00', 'other1'),
        (8, 2, '2026-01-02 10:00:00', 'other2');
    `);
    expect(ids).toEqual([]);
  });

  it("w obrębie tenanta remis created_at nadal rozstrzyga id, a wiersz innego najemcy przy tym samym znaczniku się nie liczy", async () => {
    const ids = await pageIds(`
      CREATE TABLE posts (
        id BIGINT PRIMARY KEY,
        tenant_id INT NOT NULL,
        created_at DATETIME NOT NULL,
        title VARCHAR(40)
      );
      INSERT INTO posts VALUES
        (1, 1, '2026-01-04 10:00:00', 'a'),
        (2, 1, '2026-01-04 10:00:00', 'b'),
        (3, 1, '2026-01-04 10:00:00', 'c'),
        (6, 1, '2026-01-01 10:00:00', 'd'),
        (0, 2, '2026-01-04 10:00:00', 'e');
    `);
    expect(ids).toEqual([1, 6]);
  });
});
