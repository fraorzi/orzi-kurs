export function solve(permissions: Record<string, string[]>, role: string, action: string): boolean {
  return role in permissions;
}

