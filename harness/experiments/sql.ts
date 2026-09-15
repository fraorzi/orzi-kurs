import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { RowDataPacket } from "mysql2";
import { withMySql } from "../mysql-test";
import { isJsonValue, isRecord, type JsonValue } from "../../shared/experiments";

export async function runSqlExperiment(taskDir: string, input: JsonValue): Promise<{ columns: string[]; rows: JsonValue[][] }> {
  if (!isRecord(input) || !Array.isArray(input.customers) || !input.customers.every((id): id is number => typeof id === "number" && Number.isSafeInteger(id))
    || !Array.isArray(input.orders) || !input.orders.every((order) => isRecord(order) && typeof order.id === "number" && Number.isSafeInteger(order.id)
      && typeof order.customerId === "number" && Number.isSafeInteger(order.customerId) && typeof order.status === "string" && order.status.length <= 20)
    || input.customers.length > 200 || input.orders.length > 200) throw new Error("Podaj customers jako listę id i orders jako listę {id, customerId, status}, do 200 rekordów każda.");
  const customers = input.customers;
  const orders = input.orders;
  const sql = readFileSync(join(taskDir, "starter.sql"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/--[^\n]*/g, "").trim().replace(/;\s*$/, "");
  if (!/^SELECT\b/i.test(sql) || /;|\b(?:INTO|OUTFILE|DUMPFILE|LOAD_FILE|SLEEP|BENCHMARK)\b/i.test(sql)) throw new Error("Eksperyment obsługuje pojedyncze zapytanie SELECT bez zapisu i funkcji systemowych.");
  return withMySql("CREATE TABLE customers (id BIGINT PRIMARY KEY); CREATE TABLE orders (id BIGINT PRIMARY KEY, customer_id BIGINT NOT NULL, status VARCHAR(20) NOT NULL);", async (connection) => {
    for (const id of customers) await connection.execute("INSERT INTO customers VALUES (?)", [id]);
    for (const order of orders) {
      if (!isRecord(order)) throw new Error("Nieprawidłowe zamówienie.");
      await connection.execute("INSERT INTO orders VALUES (?, ?, ?)", [order.id, order.customerId, order.status]);
    }
    await connection.query("SET SESSION MAX_EXECUTION_TIME=3000");
    await connection.query("START TRANSACTION READ ONLY");
    const [result, fields] = await connection.query<RowDataPacket[]>({ sql, timeout: 4000 });
    const columns = fields.map((field) => field.name);
    return { columns, rows: result.slice(0, 200).map((row) => columns.map((column) => {
      const value: unknown = row[column];
      return isJsonValue(value) ? value : String(value);
    })) };
  });
}
