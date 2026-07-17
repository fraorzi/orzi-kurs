import { describe, expect, it } from "vitest";
import { rows, withMySql } from "@harness/mysql-test";
import { migrateUserEmails } from "./starter";

describe("Migration contract", () => {
  it("migruje legacy rows i egzekwuje nowy invariant", async () => {
    await withMySql(
      "CREATE TABLE users(id INT PRIMARY KEY,email VARCHAR(255) NOT NULL); INSERT INTO users VALUES (1,' Ada@Example.COM '),(2,'grace@example.com')",
      async (connection) => {
        await migrateUserEmails(connection);
        expect(
          await rows(
            connection,
            "SELECT id,email_normalized AS normalized FROM users ORDER BY id",
          ),
        ).toEqual([
          { id: 1, normalized: "ada@example.com" },
          { id: 2, normalized: "grace@example.com" },
        ]);
        expect(
          await rows(
            connection,
            "SELECT IS_NULLABLE AS nullable FROM information_schema.columns WHERE table_schema=DATABASE() AND table_name='users' AND column_name='email_normalized'",
          ),
        ).toEqual([{ nullable: "NO" }]);
        await expect(
          connection.query(
            "INSERT INTO users VALUES (3,'other','ada@example.com')",
          ),
        ).rejects.toMatchObject({ code: "ER_DUP_ENTRY" });
      },
    );
  });
});
