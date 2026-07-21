export function solve(permissions: Record<string, string[]>, role: string, action: string): boolean {
  return permissions[role]?.includes(action) ?? false;
}

