import { LOG_LEVELS, type LogLevel, type LogRecord } from "./types";

export function parseRecord(text: string): LogRecord {
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    throw new Error("invalid-json");
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("not-an-object");
  }
  const record = value as Record<string, unknown>;
  if (!LOG_LEVELS.includes(record.level as LogLevel)) {
    throw new Error("unknown-level");
  }
  if (typeof record.message !== "string" || record.message.length === 0) {
    throw new Error("missing-message");
  }
  return { level: record.level as LogLevel, message: record.message };
}
