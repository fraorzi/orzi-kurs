export function solve(existing: string[], requested: string[] | "*"): string[] | "*" {
  if (requested === "*") return "*";
  const allowed = new Set(existing);
  return [...new Set(requested)].filter((locale) => allowed.has(locale)).sort();
}

