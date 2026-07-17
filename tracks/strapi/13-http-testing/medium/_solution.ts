export type Role = "anonymous" | "editor" | "admin";
export async function solve(request: (role: Role) => Promise<number>): Promise<number[]> {
  return Promise.all((["anonymous", "editor", "admin"] as const).map(request));
}

