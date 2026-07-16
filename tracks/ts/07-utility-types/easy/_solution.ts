export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
}

export type Role = User["role"];

export type UserPreview = Pick<User, "id" | "name">;

export type NewUser = Omit<User, "id">;

export type UserPatch = Partial<NewUser>;

export type RoleCounts = Record<Role, number>;

export function toPreview(user: User): UserPreview {
  return { id: user.id, name: user.name };
}

export function createUser(input: NewUser, id: number): User {
  return { id, ...input };
}

export function applyPatch(user: User, patch: UserPatch): User {
  return { ...user, ...patch };
}

export function countRoles(users: readonly User[]): RoleCounts {
  const counts: RoleCounts = { admin: 0, editor: 0, viewer: 0 };
  for (const user of users) {
    counts[user.role] += 1;
  }
  return counts;
}
