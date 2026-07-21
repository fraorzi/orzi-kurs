import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE cart_items (
    cart_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    qty INT NOT NULL,
    PRIMARY KEY (cart_id, product_id)
  );
`;

describe("Zrób addytywny upsert", () => {
  it("przy konflikcie dodaje ilość do istniejącej, nie nadpisuje jej", async () => {
    await withMySql(
      `${schema}
       INSERT INTO cart_items VALUES (1, 10, 2);`,
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(connection, "SELECT * FROM cart_items"),
        ).toEqual([{ cart_id: 1, product_id: 10, qty: 5 }]);
      },
    );
  });

  it("gdy nie ma konfliktu, wstawia nowy wiersz z podaną ilością", async () => {
    await withMySql(schema, async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      expect(await rows(connection, "SELECT * FROM cart_items")).toEqual([
        { cart_id: 1, product_id: 10, qty: 3 },
      ]);
    });
  });

  it("dwukrotne uruchomienie tego samego zapytania sumuje ilość dwa razy", async () => {
    await withMySql(
      `${schema}
       INSERT INTO cart_items VALUES (1, 10, 2);`,
      async (connection) => {
        const sql = readTaskSql(import.meta.url);
        await connection.query(sql);
        await connection.query(sql);
        expect(
          await rows(connection, "SELECT * FROM cart_items"),
        ).toEqual([{ cart_id: 1, product_id: 10, qty: 8 }]);
      },
    );
  });

  it("nie zmienia ilości innego produktu w tym samym koszyku", async () => {
    await withMySql(
      `${schema}
       INSERT INTO cart_items VALUES (1, 20, 7);`,
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        expect(
          await rows(
            connection,
            "SELECT * FROM cart_items ORDER BY product_id",
          ),
        ).toEqual([
          { cart_id: 1, product_id: 10, qty: 3 },
          { cart_id: 1, product_id: 20, qty: 7 },
        ]);
      },
    );
  });
});
