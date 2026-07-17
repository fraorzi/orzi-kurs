export async function solve(root: string, input: string): Promise<string> {
  const { resolve, sep } = await import("node:path");
  const base = resolve(root);
  const candidate = resolve(base, input);
  if (candidate !== base && !candidate.startsWith(base + sep))
    throw new Error("Ścieżka poza rootem");
  return candidate;
}
