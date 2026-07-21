export function solve(draft: string | null, published: string | null): "new" | "modified" | "published" {
  if (published === null) return "new";
  return draft === published ? "published" : "modified";
}

