import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Expand i backfill", () => {
  it("migruje stare rekordy przed zaostrzeniem kontraktu", async () => {
    await withMySql(
      "CREATE TABLE users(id INT PRIMARY KEY, phone VARCHAR(30) NOT NULL); INSERT INTO users VALUES (1,'501 002 003'),(2,'502-003-004')",
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(connection, "SELECT id,phone_e164 FROM users ORDER BY id"),
        ).toEqual([
          { id: 1, phone_e164: "+48501002003" },
          { id: 2, phone_e164: "+48502003004" },
        ]);
        const column = (
          await rows(
            connection,
            "SELECT IS_NULLABLE AS nullable FROM information_schema.columns WHERE table_schema=DATABASE() AND table_name='users' AND column_name='phone_e164'",
          )
        )[0];
        expect(column.nullable).toBe("NO");
        await expect(
          connection.query(
            "INSERT INTO users VALUES (3,'other','+48501002003')",
          ),
        ).rejects.toMatchObject({ code: "ER_DUP_ENTRY" });
      },
    );
  });
});
