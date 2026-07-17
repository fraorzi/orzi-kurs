export function solve(preview: boolean, role?: string): "draft" | "published" {
  return preview ? "draft" : "published";
}

