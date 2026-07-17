import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Keyset plan", () => {
  it("zachowuje zawartość strony", async () => {
    await withMySql(
      "CREATE TABLE logs(id INT PRIMARY KEY,payload VARCHAR(20));\nSET SESSION cte_max_recursion_depth=1200;\nINSERT INTO logs WITH RECURSIVE seq AS (SELECT 1 n UNION ALL SELECT n+1 FROM seq WHERE n<1000)\nSELECT n,CONCAT('log-',n) FROM seq",
      async (connection) => {
        const [result] = await connection.query(readTaskSql(import.meta.url));
        expect((result as Array<{ id: number }>).map((row) => row.id)).toEqual(
          Array.from({ length: 10 }, (_, index) => index + 501),
        );
      },
    );
  });

  it("[quality] zaczyna skan od cursora bez OFFSET", async () => {
    await withMySql(
      "CREATE TABLE logs(id INT PRIMARY KEY,payload VARCHAR(20));\nSET SESSION cte_max_recursion_depth=1200;\nINSERT INTO logs WITH RECURSIVE seq AS (SELECT 1 n UNION ALL SELECT n+1 FROM seq WHERE n<1000)\nSELECT n,CONCAT('log-',n) FROM seq",
      async (connection) => {
        const sql = readTaskSql(import.meta.url)
          .trim()
          .replace(/;$/, "");
        expect(sql).not.toMatch(/\bOFFSET\b/i);
        const plan = await rows(connection, `EXPLAIN ${sql}`);
        expect(plan[0].key).toBe("PRIMARY");
        expect(plan[0].type).toBe("range");
      },
    );
  });
});
