import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Lost update", () => {
  it("zachowuje obie równoległe inkrementacje", async () => {
    await withMySql(
      "CREATE TABLE counters(id INT PRIMARY KEY,value INT NOT NULL); INSERT INTO counters VALUES (1,0)",
      async (connection, { connect }) => {
        const peer = await connect();
        try {
          const sql = readTaskSql(import.meta.url);
          await Promise.all([connection.query(sql), peer.query(sql)]);
          expect(
            await rows(connection, "SELECT value FROM counters WHERE id=1"),
          ).toEqual([{ value: 2 }]);
        } finally {
          await peer.end();
        }
      },
    );
  });
});
