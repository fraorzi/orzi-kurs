import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Consistent snapshot", () => {
  it("nie zmienia obrazu danych po commicie drugiej sesji", async () => {
    await withMySql(
      "CREATE TABLE tickets(id INT PRIMARY KEY, status VARCHAR(20), INDEX(status)); INSERT INTO tickets VALUES (1,'open')",
      async (connection, { connect }) => {
        await connection.query(readTaskSql(import.meta.url));
        const writer = await connect();
        try {
          await writer.query("INSERT INTO tickets VALUES (2,'open')");
          expect(
            await rows(
              connection,
              "SELECT COUNT(*) AS count FROM tickets WHERE status='open'",
            ),
          ).toEqual([{ count: 1 }]);
        } finally {
          await connection.rollback();
          await writer.end();
        }
      },
    );
  });
});
