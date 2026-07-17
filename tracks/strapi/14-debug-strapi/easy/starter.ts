export interface Row { id: number; documentId: string; title: string }
export function solve(rows: Row[], value: string): Row | null {
  return rows.find((row) => row.id === Number(value)) ?? null;
}

