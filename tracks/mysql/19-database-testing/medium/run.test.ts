import { describe, expect, it } from "vitest";
import { rows, withMySql } from "@harness/mysql-test";
import { withRollbackFixture } from "./starter";

describe("Rollback fixture", () => {
  it("usuwa dane po sukcesie i po wyjątku callbacku", async () => {
    await withMySql(
      "CREATE TABLE notes(id INT PRIMARY KEY,body VARCHAR(80))",
      async (connection) => {
        await expect(
          withRollbackFixture(connection, async () => {
            await connection.query("INSERT INTO notes VALUES (1,'success')");
            return "result";
          }),
        ).resolves.toBe("result");
        expect(
          await rows(connection, "SELECT COUNT(*) AS count FROM notes"),
        ).toEqual([{ count: 0 }]);

        await expect(
          withRollbackFixture(connection, async () => {
            await connection.query("INSERT INTO notes VALUES (2,'failure')");
            throw new Error("test failure");
          }),
        ).rejects.toThrow("test failure");
        expect(
          await rows(connection, "SELECT COUNT(*) AS count FROM notes"),
        ).toEqual([{ count: 0 }]);
      },
    );
  });
});
