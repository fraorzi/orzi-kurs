export async function solve(id: string, seen: Set<string>, handle: () => Promise<void>): Promise<boolean> {
  await handle();
  return true;
}

