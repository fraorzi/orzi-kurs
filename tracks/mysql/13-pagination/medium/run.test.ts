import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

async function pageIds(sql: string): Promise<number[]> {
  return withMySql(sql, async (connection) => {
    const [raw] = await connection.query(readTaskSql(import.meta.url));
    const rows = Array.isArray(raw) && Array.isArray(raw[0]) ? raw.at(-1) : raw;
    return (rows as Array<{ id: number }>).map((row) => row.id);
  });
}

describe("Keyset cursor zamiast OFFSET", () => {
  it("zwraca kolejne wiersze po kursorze, pomijając sam wiersz kursora", async () => {
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
        (7, 2, '2026-01-04 10:00:00', 'other');
    `);
    expect(ids).toEqual([4, 6]);
    expect(ids).not.toContain(5);
  });

  it("przy remisie created_at z kursorem filtruje po id, nie odrzuca całego znacznika czasu", async () => {
    const ids = await pageIds(`
      CREATE TABLE posts (
        id BIGINT PRIMARY KEY,
        tenant_id INT NOT NULL,
        created_at DATETIME NOT NULL,
        title VARCHAR(40)
      );
      INSERT INTO posts VALUES
        (1, 1, '2026-01-02 10:00:00', 'a'),
        (2, 1, '2026-01-02 10:00:00', 'b'),
        (3, 1, '2026-01-02 10:00:00', 'c'),
        (4, 1, '2026-01-02 10:00:00', 'd'),
        (5, 1, '2026-01-02 10:00:00', 'e'),
        (6, 1, '2026-01-02 10:00:00', 'f'),
        (7, 1, '2026-01-02 10:00:00', 'g');
    `);
    expect(ids).toEqual([4, 3, 2]);
  });

  it("gdy wszystkie wiersze są nowsze niż kursor, strona jest pusta", async () => {
    const ids = await pageIds(`
      CREATE TABLE posts (
        id BIGINT PRIMARY KEY,
        tenant_id INT NOT NULL,
        created_at DATETIME NOT NULL,
        title VARCHAR(40)
      );
      INSERT INTO posts VALUES
        (1, 1, '2026-01-05 10:00:00', 'a'),
        (2, 1, '2026-01-06 10:00:00', 'b');
    `);
    expect(ids).toEqual([]);
  });
});
