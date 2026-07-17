import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Porównaj z poprzednim pomiarem", () => {
  it("wykonuje poprawny kontrakt na MySQL 8.4", async () => {
    await withMySql(
      "CREATE TABLE readings (id BIGINT PRIMARY KEY, sensor_id BIGINT NOT NULL, measured_at DATETIME NOT NULL, value INT NOT NULL); INSERT INTO readings VALUES (1,1,'2026-01-01',10),(2,1,'2026-01-02',13),(3,2,'2026-01-01',20);",
      async (connection) => {
        const sql = readTaskSql(import.meta.url);
        const [result] =
          await connection.query<import("mysql2").RowDataPacket[]>(sql);
        expect(result).toEqual([
          { id: 1, value: 10, delta: null },
          { id: 2, value: 13, delta: 3 },
          { id: 3, value: 20, delta: null },
        ]);
      },
    );
  });
});
