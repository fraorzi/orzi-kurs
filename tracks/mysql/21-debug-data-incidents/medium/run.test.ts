import { describe, expect, it } from "vitest";
import { readTaskSql, rows, withMySql } from "@harness/mysql-test";

const schema =
  "CREATE TABLE counters(id INT PRIMARY KEY,value INT NOT NULL); INSERT INTO counters VALUES (1,0)";

describe("Lost update", () => {
  it("pojedyncze wykonanie zwiększa licznik o dokładnie jeden", async () => {
    await withMySql(schema, async (connection) => {
      await connection.query(readTaskSql(import.meta.url));
      expect(
        await rows(connection, "SELECT value FROM counters WHERE id=1"),
      ).toEqual([{ value: 1 }]);
    });
  });

  it("zachowuje obie równoległe inkrementacje", async () => {
    await withMySql(schema, async (connection, { connect }) => {
      const peer = await connect();
      try {
        const sql = readTaskSql(import.meta.url);
        await Promise.all([connection.query(sql), peer.query(sql)]);
        expect(
          await rows(connection, "SELECT value FROM counters WHERE id=1"),
        ).toEqual([{ value: 2 }]);
      } finally {
        await peer.end();
      }
    });
  });

  it("zachowuje wszystkie inkrementacje pod dziesięcioma równoległymi sesjami", async () => {
    await withMySql(schema, async (connection, { connect }) => {
      const peers = await Promise.all(
        Array.from({ length: 9 }, () => connect()),
      );
      try {
        const sql = readTaskSql(import.meta.url);
        await Promise.all([
          connection.query(sql),
          ...peers.map((peer) => peer.query(sql)),
        ]);
        expect(
          await rows(connection, "SELECT value FROM counters WHERE id=1"),
        ).toEqual([{ value: 10 }]);
      } finally {
        await Promise.all(peers.map((peer) => peer.end()));
      }
    });
  });
});
