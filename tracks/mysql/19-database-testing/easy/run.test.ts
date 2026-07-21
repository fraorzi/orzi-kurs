import { describe, expect, it } from "vitest";
import { rows, withMySql } from "@harness/mysql-test";
import { seedUsers } from "./starter";

const schema =
  "CREATE TABLE users(id INT PRIMARY KEY, name VARCHAR(80) NOT NULL)";

describe("Deterministic fixture", () => {
  it("wstawia kanonicznych użytkowników do pustej tabeli", async () => {
    await withMySql(schema, async (connection) => {
      await seedUsers(connection);
      expect(
        await rows(connection, "SELECT id, name FROM users ORDER BY id"),
      ).toEqual([
        { id: 101, name: "Ada" },
        { id: 102, name: "Grace" },
      ]);
    });
  });

  it("przy powtórnym wywołaniu naprawia przestarzałą wartość bez duplikatu", async () => {
    await withMySql(
      `${schema}; INSERT INTO users VALUES (101, 'stale')`,
      async (connection) => {
        await seedUsers(connection);
        await seedUsers(connection);
        expect(
          await rows(connection, "SELECT id, name FROM users ORDER BY id"),
        ).toEqual([
          { id: 101, name: "Ada" },
          { id: 102, name: "Grace" },
        ]);
      },
    );
  });

  it("nie rusza wierszy spoza zestawu kanonicznego", async () => {
    await withMySql(
      `${schema}; INSERT INTO users VALUES (999, 'from-other-test')`,
      async (connection) => {
        await seedUsers(connection);
        expect(
          await rows(connection, "SELECT id, name FROM users ORDER BY id"),
        ).toEqual([
          { id: 101, name: "Ada" },
          { id: 102, name: "Grace" },
          { id: 999, name: "from-other-test" },
        ]);
      },
    );
  });

  it("jest no-opem, gdy dane są już kanoniczne", async () => {
    await withMySql(schema, async (connection) => {
      await seedUsers(connection);
      await seedUsers(connection);
      await seedUsers(connection);
      expect(
        await rows(connection, "SELECT COUNT(*) AS count FROM users"),
      ).toEqual([{ count: 2 }]);
    });
  });
});
