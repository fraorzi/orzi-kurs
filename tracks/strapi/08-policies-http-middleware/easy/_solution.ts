export function solve(user: { role?: string } | undefined): boolean {
  return user?.role === "editor" || user?.role === "admin";
}

