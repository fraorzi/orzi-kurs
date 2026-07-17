import { describe, expect, it } from "vitest";
import { withMySql } from "@harness/mysql-test";
import { findUserByEmail } from "./starter";

describe("Prepared lookup", () => {
  it("zwraca typowany wiersz i neutralizuje payload injection", async () => {
    await withMySql(
      "CREATE TABLE users(id INT PRIMARY KEY,email VARCHAR(255) UNIQUE); INSERT INTO users VALUES (1,'ada@example.com'),(2,'grace@example.com')",
      async (_connection, { createPool }) => {
        const pool = createPool();
        try {
          await expect(
            findUserByEmail(pool, "ada@example.com"),
          ).resolves.toEqual({ id: 1, email: "ada@example.com" });
          await expect(
            findUserByEmail(pool, "' OR 1=1 -- "),
          ).resolves.toBeNull();
        } finally {
          await pool.end();
        }
      },
    );
  });
});
