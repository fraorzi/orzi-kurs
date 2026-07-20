import type { TaskProgress } from "./types";
import type { TaskUndoRecord } from "@/shared/task-undo";

const STORAGE_KEY = "orzi:task-undo";
const MAX_RECORDS = 4;

export const UNDO_DURATION_MS = 12_000;

function isUndoRecord(value: unknown): value is TaskUndoRecord<TaskProgress> {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<TaskUndoRecord<TaskProgress>>;
  const revealedHints = (value as { revealedHints?: unknown }).revealedHints;
  return (
    typeof record.id === "string" &&
    typeof record.taskId === "string" &&
    typeof record.message === "string" &&
    typeof record.createdAt === "number" &&
    typeof record.expiresAt === "number" &&
    (record.kind === "code" || record.kind === "progress") &&
    (record.kind !== "code" ||
      revealedHints === undefined ||
      (Array.isArray(revealedHints) && revealedHints.every((hint) => typeof hint === "string"))) &&
    record.payload !== null &&
    typeof record.payload === "object"
  );
}

function readRecords(): TaskUndoRecord<TaskProgress>[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter(isUndoRecord) : [];
  } catch {
    return [];
  }
}

function writeRecords(records: TaskUndoRecord<TaskProgress>[]): boolean {
  if (typeof window === "undefined") return false;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records.slice(-MAX_RECORDS)));
    return true;
  } catch {
    return false;
  }
}

export function loadUndoRecords(taskId: string): TaskUndoRecord<TaskProgress>[] {
  const now = Date.now();
  const records = readRecords();
  const active = records.filter((record) => record.expiresAt > now);
  if (active.length !== records.length) writeRecords(active);
  return active.filter((record) => record.taskId === taskId);
}

export function storeUndoRecord(record: TaskUndoRecord<TaskProgress>): boolean {
  const records = readRecords().filter(
    (item) => item.expiresAt > Date.now() && item.id !== record.id,
  );
  return writeRecords([...records, record]);
}

export function removeUndoRecord(id: string): void {
  writeRecords(readRecords().filter((record) => record.id !== id));
}
