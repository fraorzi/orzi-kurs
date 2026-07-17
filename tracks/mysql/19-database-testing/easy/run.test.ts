import { describe, expect, it } from "vitest";
import { rows, withMySql } from "@harness/mysql-test";
import { seedUsers } from "./starter";

describe("Deterministic fixture", () => {
  it("może zostać uruchomiona wielokrotnie i naprawia stare wartości", async () => {
    await withMySql(
      "CREATE TABLE users(id INT PRIMARY KEY,name VARCHAR(80) NOT NULL); INSERT INTO users VALUES (101,'stale')",
      async (connection) => {
        await seedUsers(connection);
        await seedUsers(connection);
        expect(
          await rows(connection, "SELECT id,name FROM users ORDER BY id"),
        ).toEqual([
          { id: 101, name: "Ada" },
          { id: 102, name: "Grace" },
        ]);
      },
    );
  });
});
