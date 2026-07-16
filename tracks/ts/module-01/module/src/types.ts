// TODO: readonly tuple ról (as const)
export const ROLES = ["admin", "editor", "viewer"];

// TODO: unia ról wyprowadzona z ROLES
export type Role = string;

// TODO: wszystkie pola readonly
export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
}

// TODO: User bez id i createdAt (Omit)
export type NewUser = unknown;

// TODO: opcjonalne name/email/role (Partial + Omit)
export type UserPatch = unknown;

// TODO: unia rozłączna wyniku (domyślny typ błędu: string[])
export type Result<T, E = string[]> = {
  ok: boolean;
  value?: T;
  error?: E;
};
