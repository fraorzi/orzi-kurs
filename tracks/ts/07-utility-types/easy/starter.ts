export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
}

export type Role = User["role"];

// TODO: tylko id i name — Pick.
export type UserPreview = unknown;

// TODO: User bez id — Omit.
export type NewUser = unknown;

// TODO: każde pole NewUser opcjonalne — Partial + Omit.
export type UserPatch = unknown;

// TODO: mapa rola → liczba, z kompletem ról — Record.
export type RoleCounts = unknown;

export function toPreview(user: User): UserPreview {
  // TODO: zwróć wyłącznie id i name
  throw new Error("TODO");
}

export function createUser(input: NewUser, id: number): User {
  // TODO: dane wejściowe + nadane id
  throw new Error("TODO");
}

export function applyPatch(user: User, patch: UserPatch): User {
  // TODO: nowy obiekt; pola z patch nadpisują pola user; bez mutacji
  throw new Error("TODO");
}

export function countRoles(users: readonly User[]): RoleCounts {
  // TODO: każda rola ma wpis, także 0
  throw new Error("TODO");
}
