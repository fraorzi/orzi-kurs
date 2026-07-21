import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema = `
  CREATE TABLE bins (
    id INT PRIMARY KEY,
    quantity INT NOT NULL
  );
`;

describe("Deadlock retry", () => {
  it("ponawia ofiarę deadlocku i zachowuje sumę zapasu", async () => {
    await withMySql(
      `${schema}
       INSERT INTO bins VALUES (1, 10), (2, 10);`,
      async (connection, { connect }) => {
        await connection.query(readTaskSql(import.meta.url));
        const second = await connect();
        try {
          const outcomes = await Promise.allSettled([
            connection.query("CALL move_stock(1,2,1)"),
            second.query("CALL move_stock(2,1,1)"),
          ]);
          expect(
            outcomes.every((result) => result.status === "fulfilled"),
          ).toBe(true);
          expect(
            await rows(connection, "SELECT id, quantity FROM bins ORDER BY id"),
          ).toEqual([
            { id: 1, quantity: 10 },
            { id: 2, quantity: 10 },
          ]);
        } finally {
          await second.end();
        }
      },
    );
  });

  it("dwa przeciwne przesunięcia o różnej wielkości zachowują sumę zapasu", async () => {
    await withMySql(
      `${schema}
       INSERT INTO bins VALUES (1, 10), (2, 10);`,
      async (connection, { connect }) => {
        await connection.query(readTaskSql(import.meta.url));
        const second = await connect();
        try {
          const outcomes = await Promise.allSettled([
            connection.query("CALL move_stock(1,2,3)"),
            second.query("CALL move_stock(2,1,5)"),
          ]);
          expect(
            outcomes.every((result) => result.status === "fulfilled"),
          ).toBe(true);
          expect(
            await rows(connection, "SELECT id, quantity FROM bins ORDER BY id"),
          ).toEqual([
            { id: 1, quantity: 12 },
            { id: 2, quantity: 8 },
          ]);
        } finally {
          await second.end();
        }
      },
    );
  });

  it("pojedyncze wywołanie bez rywalizacji przenosi zapas poprawnie", async () => {
    await withMySql(
      `${schema}
       INSERT INTO bins VALUES (1, 10), (2, 10);`,
      async (connection) => {
        await connection.query(readTaskSql(import.meta.url));
        await connection.query("CALL move_stock(1,2,3)");
        expect(
          await rows(connection, "SELECT id, quantity FROM bins ORDER BY id"),
        ).toEqual([
          { id: 1, quantity: 7 },
          { id: 2, quantity: 13 },
        ]);
      },
    );
  });
});
