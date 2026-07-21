import { describe, expect, it } from "vitest";
import { rows, withMySql } from "@harness/mysql-test";
import { withRollbackFixture } from "./starter";

const schema = "CREATE TABLE notes(id INT PRIMARY KEY, body VARCHAR(80))";

describe("Rollback fixture", () => {
  it("wycofuje dane mimo pomyślnego wyniku callbacku", async () => {
    await withMySql(schema, async (connection) => {
      await expect(
        withRollbackFixture(connection, async () => {
          await connection.query("INSERT INTO notes VALUES (1,'success')");
          return "result";
        }),
      ).resolves.toBe("result");
      expect(
        await rows(connection, "SELECT COUNT(*) AS count FROM notes"),
      ).toEqual([{ count: 0 }]);
    });
  });

  it("wycofuje dane i propaguje oryginalny błąd, gdy callback rzuca", async () => {
    await withMySql(schema, async (connection) => {
      await expect(
        withRollbackFixture(connection, async () => {
          await connection.query("INSERT INTO notes VALUES (2,'failure')");
          throw new Error("test failure");
        }),
      ).rejects.toThrow("test failure");
      expect(
        await rows(connection, "SELECT COUNT(*) AS count FROM notes"),
      ).toEqual([{ count: 0 }]);
    });
  });

  it("dane są widoczne wewnątrz callbacku przed rollbackiem", async () => {
    await withMySql(schema, async (connection) => {
      await withRollbackFixture(connection, async () => {
        await connection.query("INSERT INTO notes VALUES (3,'in-flight')");
        expect(
          await rows(connection, "SELECT COUNT(*) AS count FROM notes"),
        ).toEqual([{ count: 1 }]);
      });
      expect(
        await rows(connection, "SELECT COUNT(*) AS count FROM notes"),
      ).toEqual([{ count: 0 }]);
    });
  });

  it("kolejne wywołania na tym samym połączeniu nie zostawiają otwartej transakcji", async () => {
    await withMySql(schema, async (connection) => {
      await withRollbackFixture(connection, async () => {
        await connection.query("INSERT INTO notes VALUES (1,'first')");
      });
      await withRollbackFixture(connection, async () => {
        await connection.query("INSERT INTO notes VALUES (2,'second')");
        return "ok";
      });
      expect(
        await rows(connection, "SELECT COUNT(*) AS count FROM notes"),
      ).toEqual([{ count: 0 }]);
    });
  });
});
