import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("MySQL SQL smoke", () => {
  it("wykonuje artefakt SQL na izolowanym schemacie", async () => {
    await withMySql(
      `CREATE TABLE users (id BIGINT PRIMARY KEY, active BOOLEAN NOT NULL);
       INSERT INTO users VALUES (1, TRUE), (2, FALSE), (3, TRUE);`,
      async (connection) => {
        const result = await rows<{ id: number } & import("mysql2").RowDataPacket>(
          connection,
          readTaskSql(import.meta.url),
        );
        expect(result.map((row) => Number(row.id))).toEqual([1, 3]);
      },
    );
  });
});
