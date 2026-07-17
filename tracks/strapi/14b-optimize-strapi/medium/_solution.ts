export async function solve(ids: string[], fetchMany: (ids: string[]) => Promise<Record<string, string>>): Promise<string[]> {
  if (ids.length === 0) return [];
  const rows = await fetchMany([...new Set(ids)]);
  return ids.map((id) => rows[id]);
}

