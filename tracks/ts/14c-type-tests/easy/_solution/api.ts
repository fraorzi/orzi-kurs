export type Role = "admin" | "viewer";
export type NewUser = { name: string; role: Role };
export type User = NewUser & { id: number };

export function createUser(input: NewUser): User {
  return { id: 1, ...input };
}
