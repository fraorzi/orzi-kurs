import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Targeted revoke", () => {
  it("usuwa jedną capability bez rozszerzania pozostałych", async () => {
    await withMySql("", async (connection) => {
      await connection.query(
        "DROP USER IF EXISTS 'orzi_app_api'@'localhost', 'orzi_service'@'localhost'; DROP ROLE IF EXISTS 'orzi_app_reader', 'orzi_writer'",
      );
      try {
        await connection.query(
          "CREATE ROLE 'orzi_writer'; CREATE USER 'orzi_app_api'@'localhost'; GRANT SELECT,UPDATE,DELETE ON app_data.* TO 'orzi_writer'; GRANT 'orzi_writer' TO 'orzi_app_api'@'localhost'",
        );
        await connection.query(readTaskSql(import.meta.url));
        const grants = (await rows(connection, "SHOW GRANTS FOR 'orzi_writer'"))
          .flatMap(Object.values)
          .join(" ");
        expect(grants).toContain("SELECT, UPDATE");
        expect(grants).not.toContain("DELETE");
        expect(
          await rows(
            connection,
            "SELECT DEFAULT_ROLE_USER AS roleName FROM mysql.default_roles WHERE USER='orzi_app_api' AND HOST='localhost'",
          ),
        ).toEqual([{ roleName: "orzi_writer" }]);
      } finally {
        await connection.query(
          "DROP USER IF EXISTS 'orzi_app_api'@'localhost', 'orzi_service'@'localhost'; DROP ROLE IF EXISTS 'orzi_app_reader', 'orzi_writer'",
        );
      }
    });
  });
});
