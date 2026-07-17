import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Czytaj typowany fragment JSON", () => {
  it("wykonuje poprawny kontrakt na MySQL 8.4", async () => {
    await withMySql(
      'CREATE TABLE profiles (id BIGINT PRIMARY KEY, settings JSON NOT NULL); INSERT INTO profiles VALUES (1,\'{"notifications":{"language":"pl"}}\'),(2,\'{"notifications":{"language":7}}\'),(3,\'{}\');',
      async (connection) => {
        const sql = readTaskSql(import.meta.url);
        const [result] =
          await connection.query<import("mysql2").RowDataPacket[]>(sql);
        expect(result).toEqual([{ id: 1, language: "pl" }]);
      },
    );
  });
});
