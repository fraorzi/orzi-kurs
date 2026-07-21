import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

async function pageIds(sql: string): Promise<number[]> {
  return withMySql(sql, async (connection) => {
    const [raw] = await connection.query(readTaskSql(import.meta.url));
    const rows = Array.isArray(raw) && Array.isArray(raw[0]) ? raw.at(-1) : raw;
    return (rows as Array<{ id: number }>).map((row) => row.id);
  });
}

describe("Stabilny offset z pełnym ORDER BY", () => {
  it("rozstrzyga remisy created_at malejąco po id, nie zostawia ich przypadkowi", async () => {
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
    expect(ids).toEqual([3, 5, 4]);
  });

  it("przy identycznym created_at dla wszystkich wierszy porządek zależy wyłącznie od id malejąco", async () => {
    const ids = await pageIds(`
      CREATE TABLE posts (
        id BIGINT PRIMARY KEY,
        tenant_id INT NOT NULL,
        created_at DATETIME NOT NULL,
        title VARCHAR(40)
      );
      INSERT INTO posts VALUES
        (1, 1, '2026-01-01 10:00:00', 'p1'),
        (2, 1, '2026-01-01 10:00:00', 'p2'),
        (3, 1, '2026-01-01 10:00:00', 'p3'),
        (4, 1, '2026-01-01 10:00:00', 'p4'),
        (5, 1, '2026-01-01 10:00:00', 'p5'),
        (6, 1, '2026-01-01 10:00:00', 'p6');
    `);
    expect(ids).toEqual([3, 2, 1]);
  });

  it("gdy dostępnych wierszy jest mniej niż OFFSET, strona jest pusta, nie błędem", async () => {
    const ids = await pageIds(`
      CREATE TABLE posts (
        id BIGINT PRIMARY KEY,
        tenant_id INT NOT NULL,
        created_at DATETIME NOT NULL,
        title VARCHAR(40)
      );
      INSERT INTO posts VALUES
        (1, 1, '2026-01-04 10:00:00', 'p1'),
        (2, 1, '2026-01-03 10:00:00', 'p2');
    `);
    expect(ids).toEqual([]);
  });
});
