export type Role = "anonymous" | "editor" | "admin";
export async function solve(request: (role: Role) => Promise<number>): Promise<number[]> {
  return [await request("admin")];
}

