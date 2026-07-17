import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Expand/contract", () => {
  it("utrzymuje starą kolumnę podczas kompatybilnego backfillu", async () => {
    await withMySql(
      "CREATE TABLE customers(id INT PRIMARY KEY, name VARCHAR(160) NOT NULL); INSERT INTO customers VALUES (1,'Ada Lovelace'),(2,'Grace Hopper')",
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(
            connection,
            "SELECT name,given_name,family_name FROM customers ORDER BY id",
          ),
        ).toEqual([
          { name: "Ada Lovelace", given_name: "Ada", family_name: "Lovelace" },
          { name: "Grace Hopper", given_name: "Grace", family_name: "Hopper" },
        ]);
        expect(
          await rows(
            connection,
            "SELECT COUNT(*) AS count FROM information_schema.columns WHERE table_schema=DATABASE() AND table_name='customers' AND column_name='name'",
          ),
        ).toEqual([{ count: 1 }]);
      },
    );
  });
});
