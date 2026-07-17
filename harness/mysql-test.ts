import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import mysql, {
  type Connection,
  type ConnectionOptions,
  type RowDataPacket,
} from "mysql2/promise";
import type { QueryValues } from "mysql2";

function connectionOptions(database?: string): ConnectionOptions {
  const raw = process.env.ORZI_MYSQL_URL ?? process.env.MYSQL_URL;
  if (!raw) {
    throw new Error(
      "Brak ORZI_MYSQL_URL/MYSQL_URL. Uruchom testowy MySQL 8.4 i ustaw URL połączenia.",
    );
  }

  const url = new URL(raw);
  if (url.protocol !== "mysql:")
    throw new Error("URL bazy musi używać mysql://");
  return {
    host: url.hostname,
    port: url.port ? Number(url.port) : 3306,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database,
    multipleStatements: true,
    decimalNumbers: false,
    dateStrings: true,
  };
}

export function readTaskSql(
  moduleUrl: string,
  filename = "starter.sql",
): string {
  return readFileSync(
    join(dirname(fileURLToPath(moduleUrl)), filename),
    "utf8",
  );
}

export interface MySqlTestContext {
  database: string;
  connect(): Promise<Connection>;
}

export async function withMySql<T>(
  schemaSql: string,
  run: (connection: Connection, context: MySqlTestContext) => Promise<T>,
): Promise<T> {
  const database = `orzi_${process.pid}_${randomUUID().replaceAll("-", "")}`;
  const admin = await mysql.createConnection(connectionOptions());
  try {
    await admin.query(
      `CREATE DATABASE \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci`,
    );
    const connection = await mysql.createConnection(
      connectionOptions(database),
    );
    try {
      if (schemaSql.trim()) await connection.query(schemaSql);
      return await run(connection, {
        database,
        connect: () => mysql.createConnection(connectionOptions(database)),
      });
    } finally {
      await connection.end();
    }
  } finally {
    await admin.query(`DROP DATABASE IF EXISTS \`${database}\``);
    await admin.end();
  }
}

export async function rows<T extends RowDataPacket>(
  connection: Connection,
  sql: string,
  values: QueryValues = [],
): Promise<T[]> {
  const [result] = await connection.query<T[]>(sql, values);
  return result;
}
