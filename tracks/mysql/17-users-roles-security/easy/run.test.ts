import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Read-only role", () => {
  it("ogranicza scope i aktywuje rolę po logowaniu", async () => {
    await withMySql("", async (connection) => {
      await connection.query(
        "DROP USER IF EXISTS 'orzi_app_api'@'localhost', 'orzi_service'@'localhost'; DROP ROLE IF EXISTS 'orzi_app_reader', 'orzi_writer'",
      );
      try {
        await connection.query(readTaskSql(import.meta.url));
        const roleGrants = await rows(
          connection,
          "SHOW GRANTS FOR 'orzi_app_reader'",
        );
        expect(roleGrants.flatMap(Object.values).join(" ")).toContain(
          "GRANT SELECT ON `app_data`.*",
        );
        expect(
          await rows(
            connection,
            "SELECT DEFAULT_ROLE_USER AS roleName FROM mysql.default_roles WHERE USER='orzi_app_api' AND HOST='localhost'",
          ),
        ).toEqual([{ roleName: "orzi_app_reader" }]);
      } finally {
        await connection.query(
          "DROP USER IF EXISTS 'orzi_app_api'@'localhost', 'orzi_service'@'localhost'; DROP ROLE IF EXISTS 'orzi_app_reader', 'orzi_writer'",
        );
      }
    });
  });
});
