export function solve(schema: Record<string, string>, generated: Record<string, string>): string[] {
  return [...new Set([...Object.keys(schema), ...Object.keys(generated)])]
    .filter((uid) => schema[uid] !== generated[uid])
    .sort();
}

