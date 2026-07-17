import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Many-to-many", () => {
  it("egzekwuje naturalną unikalność, domenę i lifecycle relacji", async () => {
    await withMySql("", async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      await connection.query(
        "INSERT INTO students VALUES (1); INSERT INTO courses VALUES (10); INSERT INTO enrollments(student_id,course_id,status) VALUES (1,10,'active')",
      );
      await expect(
        connection.query(
          "INSERT INTO enrollments(student_id,course_id,status) VALUES (1,10,'completed')",
        ),
      ).rejects.toMatchObject({ code: "ER_DUP_ENTRY" });
      await expect(
        connection.query("UPDATE enrollments SET status='unknown'"),
      ).rejects.toMatchObject({ code: "ER_CHECK_CONSTRAINT_VIOLATED" });
      await expect(
        connection.query("DELETE FROM courses WHERE id=10"),
      ).rejects.toMatchObject({ code: "ER_ROW_IS_REFERENCED_2" });
    });
  });
});
