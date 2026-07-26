export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
}

export type Role = User["role"];

// TODO
export type UserPreview = unknown;

// TODO
export type NewUser = unknown;

// TODO
export type UserPatch = unknown;

// TODO
export type RoleCounts = unknown;

export function toPreview(user: User): UserPreview {
  // TODO
  throw new Error("TODO");
}

export function createUser(input: NewUser, id: number): User {
  // TODO
  throw new Error("TODO");
}

export function applyPatch(user: User, patch: UserPatch): User {
  // TODO
  throw new Error("TODO");
}

export function countRoles(users: readonly User[]): RoleCounts {
  // TODO
  throw new Error("TODO");
}
