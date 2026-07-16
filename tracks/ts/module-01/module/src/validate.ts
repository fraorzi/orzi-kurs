import type { NewUser, Result, Role, UserPatch } from "./types";

// TODO: strażnik typu — value is Record<string, unknown>
export function isRecord(value: unknown): boolean {
  return false;
}

// TODO: strażnik typu — value is Role (użyj ROLES)
export function isRole(value: unknown): boolean {
  return false;
}

export function parseNewUser(input: unknown): Result<NewUser> {
  // TODO: walidacja z kompletem błędów w kolejności pól
  return { ok: false, error: [] };
}

export function parsePatch(input: unknown): Result<UserPatch> {
  // TODO: waliduj tylko obecne pola; pusty obiekt jest poprawny
  return { ok: false, error: [] };
}
