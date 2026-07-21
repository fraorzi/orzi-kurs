import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

describe("Wymuś tenantową unikalność", () => {
  it("ten sam slug jest dozwolony w różnych tenantach", async () => {
    await withMySql("", async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      await connection.query(
        "INSERT INTO projects VALUES (1,1,'app'),(1,2,'app')",
      );
      expect(
        await rows(
          connection,
          "SELECT id, tenant_id, slug FROM projects ORDER BY tenant_id",
        ),
      ).toEqual([
        { id: 1, tenant_id: 1, slug: "app" },
        { id: 1, tenant_id: 2, slug: "app" },
      ]);
    });
  });

  it("duplikat sluga w obrębie tego samego tenanta jest odrzucany", async () => {
    await withMySql("", async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      await connection.query("INSERT INTO projects VALUES (1,1,'app')");
      await expect(
        connection.query("INSERT INTO projects VALUES (2,1,'app')"),
      ).rejects.toMatchObject({ code: "ER_DUP_ENTRY" });
    });
  });

  it("zadanie może wskazywać wyłącznie projekt z tego samego tenanta", async () => {
    await withMySql("", async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      await connection.query(
        "INSERT INTO projects VALUES (1,1,'app'),(1,2,'app')",
      );
      await connection.query("INSERT INTO tasks VALUES (10,1,1)");
      await expect(
        connection.query("INSERT INTO tasks VALUES (11,3,1)"),
      ).rejects.toMatchObject({ code: "ER_NO_REFERENCED_ROW_2" });
    });
  });

  it("to samo id projektu może wystąpić w różnych tenantach", async () => {
    await withMySql("", async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      await connection.query("INSERT INTO projects VALUES (1,1,'app')");
      await expect(
        connection.query("INSERT INTO projects VALUES (1,2,'other')"),
      ).resolves.toBeTruthy();
    });
  });
});
