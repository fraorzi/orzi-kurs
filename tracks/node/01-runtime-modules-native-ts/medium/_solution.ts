export function solve(source: string, filename: string): string[] {
  const reasons: string[] = [];
  if (filename.endsWith(".tsx")) reasons.push("tsx");
  if (/\benum\s+\w+/.test(source)) reasons.push("enum");
  if (/\bnamespace\s+\w+/.test(source)) reasons.push("namespace");
  if (/from\s+["']@\//.test(source)) reasons.push("path-alias");
  if (
    /import\s+\{\s*\w+\s*\}\s+from/.test(source) &&
    !/import\s+type/.test(source)
  )
    reasons.push("type-import-must-be-explicit");
  return reasons;
}
