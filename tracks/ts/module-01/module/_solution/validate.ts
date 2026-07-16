import { ROLES } from "./types";
import type { NewUser, Result, Role, UserPatch } from "./types";

const ROLE_ERROR = `role musi być jedną z: ${ROLES.join(", ")}`;
const NAME_ERROR = "name musi być niepustym tekstem";
const EMAIL_ERROR = "email musi zawierać @";
const SHAPE_ERROR = "dane nie są obiektem";

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isRole(value: unknown): value is Role {
  const roles: readonly string[] = ROLES;
  return typeof value === "string" && roles.includes(value);
}

function isName(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function isEmail(value: unknown): value is string {
  return typeof value === "string" && value.includes("@");
}

export function parseNewUser(input: unknown): Result<NewUser> {
  if (!isRecord(input)) return { ok: false, error: [SHAPE_ERROR] };

  const { name, email, role } = input;
  const errors: string[] = [];
  if (!isName(name)) errors.push(NAME_ERROR);
  if (!isEmail(email)) errors.push(EMAIL_ERROR);
  if (!isRole(role)) errors.push(ROLE_ERROR);

  if (!isName(name) || !isEmail(email) || !isRole(role)) {
    return { ok: false, error: errors };
  }
  return { ok: true, value: { name, email, role } };
}

export function parsePatch(input: unknown): Result<UserPatch> {
  if (!isRecord(input)) return { ok: false, error: [SHAPE_ERROR] };

  const patch: { name?: string; email?: string; role?: Role } = {};
  const errors: string[] = [];

  if ("name" in input) {
    if (isName(input.name)) patch.name = input.name;
    else errors.push(NAME_ERROR);
  }
  if ("email" in input) {
    if (isEmail(input.email)) patch.email = input.email;
    else errors.push(EMAIL_ERROR);
  }
  if ("role" in input) {
    if (isRole(input.role)) patch.role = input.role;
    else errors.push(ROLE_ERROR);
  }

  if (errors.length > 0) return { ok: false, error: errors };
  return { ok: true, value: patch };
}
