import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Wybierz rekord ostatniego zdarzenia", () => {
  it("wykonuje poprawny kontrakt na MySQL 8.4", async () => {
    await withMySql(
      "CREATE TABLE readings (id BIGINT PRIMARY KEY, device_id BIGINT NOT NULL, recorded_at DATETIME NOT NULL, value INT NOT NULL); INSERT INTO readings VALUES (1,1,'2026-01-01',10),(2,1,'2026-01-02',20),(3,2,'2026-01-01',30);",
      async (connection) => {
        const sql = readTaskSql(import.meta.url);
        const [result] =
          await connection.query<import("mysql2").RowDataPacket[]>(sql);
        expect(result).toEqual([
          { device_id: 1, recorded_at: "2026-01-02 00:00:00", value: 20 },
          { device_id: 2, recorded_at: "2026-01-01 00:00:00", value: 30 },
        ]);
      },
    );
  });
});
