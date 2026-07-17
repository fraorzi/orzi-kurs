import { describe, expect, it } from "vitest";
import { readTaskSql, withMySql } from "@harness/mysql-test";

describe("Zrób addytywny upsert", () => {
  it("wykonuje poprawny kontrakt na MySQL 8.4", async () => {
    await withMySql(
      "CREATE TABLE cart_items (cart_id BIGINT NOT NULL, product_id BIGINT NOT NULL, qty INT NOT NULL, PRIMARY KEY (cart_id, product_id)); INSERT INTO cart_items VALUES (1,10,2);",
      async (connection) => {
        const sql = readTaskSql(import.meta.url);
        await connection.query(sql);
        const [result] = await connection.query<
          import("mysql2").RowDataPacket[]
        >("SELECT * FROM cart_items");
        expect(result).toEqual([{ cart_id: 1, product_id: 10, qty: 5 }]);
      },
    );
  });
});
