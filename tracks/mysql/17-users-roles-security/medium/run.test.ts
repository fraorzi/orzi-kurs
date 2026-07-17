import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Service account", () => {
  it("wymusza transport i minimalny zestaw capabilities", async () => {
    await withMySql("", async (connection) => {
      await connection.query(
        "DROP USER IF EXISTS 'orzi_app_api'@'localhost', 'orzi_service'@'localhost'; DROP ROLE IF EXISTS 'orzi_app_reader', 'orzi_writer'",
      );
      try {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(
            connection,
            "SELECT ssl_type AS sslType,max_user_connections AS maxConnections FROM mysql.user WHERE User='orzi_service' AND Host='localhost'",
          ),
        ).toEqual([{ sslType: "ANY", maxConnections: 5 }]);
        const grants = (
          await rows(connection, "SHOW GRANTS FOR 'orzi_service'@'localhost'")
        )
          .flatMap(Object.values)
          .join(" ");
        expect(grants).toContain(
          "GRANT SELECT, INSERT, UPDATE ON `app_data`.*",
        );
        expect(grants).not.toMatch(/GRANT ALL|GRANT OPTION/);
      } finally {
        await connection.query(
          "DROP USER IF EXISTS 'orzi_app_api'@'localhost', 'orzi_service'@'localhost'; DROP ROLE IF EXISTS 'orzi_app_reader', 'orzi_writer'",
        );
      }
    });
  });
});
