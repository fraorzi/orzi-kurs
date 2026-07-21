import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Relacja wiele-do-wielu z domenowym stanem", () => {
  it("para student/course jest naturalnym kluczem — duplikat jest odrzucany", async () => {
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
    });
  });

  it("odrzuca insert zapisu na nieistniejącego studenta lub kurs", async () => {
    await withMySql("", async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      await connection.query("INSERT INTO courses VALUES (10)");
      await expect(
        connection.query(
          "INSERT INTO enrollments(student_id,course_id,status) VALUES (99,10,'active')",
        ),
      ).rejects.toMatchObject({ code: "ER_NO_REFERENCED_ROW_2" });
    });
  });

  it("ogranicza status do zamkniętego zbioru wartości (CHECK)", async () => {
    await withMySql("", async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      await connection.query(
        "INSERT INTO students VALUES (1); INSERT INTO courses VALUES (10); INSERT INTO enrollments(student_id,course_id,status) VALUES (1,10,'active')",
      );
      await expect(
        connection.query("UPDATE enrollments SET status='unknown'"),
      ).rejects.toMatchObject({ code: "ER_CHECK_CONSTRAINT_VIOLATED" });
    });
  });

  it("blokuje usunięcie kursu, dopóki ma zapisanych studentów (ON DELETE RESTRICT)", async () => {
    await withMySql("", async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      await connection.query(
        "INSERT INTO students VALUES (1); INSERT INTO courses VALUES (10); INSERT INTO enrollments(student_id,course_id,status) VALUES (1,10,'active')",
      );
      await expect(
        connection.query("DELETE FROM courses WHERE id=10"),
      ).rejects.toMatchObject({ code: "ER_ROW_IS_REFERENCED_2" });
    });
  });

  it("kasuje kaskadowo zapisy usuwanego studenta (ON DELETE CASCADE)", async () => {
    await withMySql("", async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      await connection.query(
        "INSERT INTO students VALUES (1); INSERT INTO courses VALUES (10); INSERT INTO enrollments(student_id,course_id,status) VALUES (1,10,'active')",
      );
      await connection.query("DELETE FROM students WHERE id=1");
      expect(await rows(connection, "SELECT * FROM enrollments")).toEqual([]);
    });
  });
});
