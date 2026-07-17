import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Dirty-data migration", () => {
  it("kanonizuje legacy rows przed wymuszeniem unique", async () => {
    await withMySql(
      "CREATE TABLE users(id INT PRIMARY KEY,email VARCHAR(255)); INSERT INTO users VALUES (1,'Ada@Example.com'),(2,' ada@example.COM '),(3,'grace@example.com')",
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(
            connection,
            "SELECT id,email_normalized AS normalized FROM users ORDER BY id",
          ),
        ).toEqual([
          { id: 1, normalized: "ada@example.com" },
          { id: 3, normalized: "grace@example.com" },
        ]);
        await expect(
          connection.query(
            "INSERT INTO users(id,email) VALUES (4,' ADA@example.com ')",
          ),
        ).rejects.toMatchObject({ code: "ER_DUP_ENTRY" });
      },
    );
  });
});
