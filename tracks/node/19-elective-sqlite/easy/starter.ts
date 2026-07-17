export function solve(filter: {
  status?: string;
  limit?: number;
  order?: string;
}): { sql: string; params: Record<string, string | number> } {
  throw new Error("TODO");
}
