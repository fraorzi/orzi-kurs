export async function solve(ids: string[], fetchMany: (ids: string[]) => Promise<Record<string, string>>): Promise<string[]> {
  const output: string[] = [];
  for (const id of ids) {
    const row = await fetchMany([id]);
    output.push(row[id]);
  }
  return output;
}

