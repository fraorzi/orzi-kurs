export const ROLES = ["admin", "editor", "viewer"] as const;

export type Role = (typeof ROLES)[number];

export interface User {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly role: Role;
  readonly createdAt: string;
}

export type NewUser = Omit<User, "id" | "createdAt">;

export type UserPatch = Partial<Omit<User, "id" | "createdAt">>;

export type Result<T, E = string[]> =
  | { ok: true; value: T }
  | { ok: false; error: E };
