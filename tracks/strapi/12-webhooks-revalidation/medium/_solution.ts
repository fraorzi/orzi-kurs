export async function solve(id: string, seen: Set<string>, handle: () => Promise<void>): Promise<boolean> {
  if (seen.has(id)) return false;
  await handle();
  seen.add(id);
  return true;
}

