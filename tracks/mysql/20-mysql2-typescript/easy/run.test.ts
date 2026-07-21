import { describe, expect, it } from "vitest";
import { withMySql } from "@harness/mysql-test";
import { findUserByEmail } from "./starter";

const schema =
  "CREATE TABLE users(id INT PRIMARY KEY,email VARCHAR(255) UNIQUE); INSERT INTO users VALUES (1,'ada@example.com'),(2,'grace@example.com')";

describe("Prepared lookup", () => {
  it("zwraca typowany wiersz dla istniejącego adresu", async () => {
    await withMySql(schema, async (_connection, { createPool }) => {
      const pool = createPool();
      try {
        await expect(
          findUserByEmail(pool, "ada@example.com"),
        ).resolves.toEqual({ id: 1, email: "ada@example.com" });
      } finally {
        await pool.end();
      }
    });
  });

  it("zwraca null, gdy żaden użytkownik nie pasuje", async () => {
    await withMySql(schema, async (_connection, { createPool }) => {
      const pool = createPool();
      try {
        await expect(
          findUserByEmail(pool, "nobody@example.com"),
        ).resolves.toBeNull();
      } finally {
        await pool.end();
      }
    });
  });

  it("neutralizuje payload injection zamiast dopasować wszystkie wiersze", async () => {
    await withMySql(schema, async (_connection, { createPool }) => {
      const pool = createPool();
      try {
        await expect(
          findUserByEmail(pool, "' OR 1=1 -- "),
        ).resolves.toBeNull();
      } finally {
        await pool.end();
      }
    });
  });

  it("obsługuje email z apostrofem jako zwykłą wartość, nie składnię SQL", async () => {
    await withMySql(
      "CREATE TABLE users(id INT PRIMARY KEY,email VARCHAR(255) UNIQUE); INSERT INTO users VALUES (1,'o''brien@example.com')",
      async (_connection, { createPool }) => {
        const pool = createPool();
        try {
          await expect(
            findUserByEmail(pool, "o'brien@example.com"),
          ).resolves.toEqual({ id: 1, email: "o'brien@example.com" });
        } finally {
          await pool.end();
        }
      },
    );
  });
});
