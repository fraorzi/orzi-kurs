export type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

interface ExperimentBase {
  title: string;
  description: string;
}
export type ExperimentDefinition = ExperimentBase & (
  | { kind: "function"; exportName: string; example: JsonValue[] }
  | { kind: "component"; exportName: string; example: { [key: string]: JsonValue } }
  | { kind: "types" }
  | { kind: "sql"; example: { customers: number[]; orders: { id: number; customerId: number; status: string }[] } }
);
export type ExperimentResult = { sourceVersion: string } & (
  | { kind: "value"; value: string; logs: string[] }
  | { kind: "component"; document: string }
  | { kind: "types"; issues: { file: string; line: number; code: string; message: string }[] }
  | { kind: "table"; columns: string[]; rows: JsonValue[][] }
);

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isJsonValue(value: unknown, depth = 0): value is JsonValue {
  if (depth > 20) return false;
  if (value === null || typeof value === "string" || typeof value === "boolean") return true;
  if (typeof value === "number") return Number.isFinite(value);
  if (Array.isArray(value)) return value.every((item) => isJsonValue(item, depth + 1));
  return isRecord(value) && Object.values(value).every((item) => isJsonValue(item, depth + 1));
}

export function isExperimentResult(value: unknown): value is ExperimentResult {
  if (!isRecord(value) || typeof value.sourceVersion !== "string") return false;
  switch (value.kind) {
    case "value": return typeof value.value === "string" && Array.isArray(value.logs) && value.logs.every((line) => typeof line === "string");
    case "component": return typeof value.document === "string";
    case "table": return Array.isArray(value.columns) && value.columns.every((column) => typeof column === "string")
      && Array.isArray(value.rows) && value.rows.every((row) => Array.isArray(row) && row.every((cell) => isJsonValue(cell)));
    case "types": return Array.isArray(value.issues) && value.issues.every((issue) => isRecord(issue) && typeof issue.file === "string"
      && typeof issue.line === "number" && typeof issue.code === "string" && typeof issue.message === "string");
    default: return false;
  }
}
