export interface Access { role: "admin" | "editor" | "public"; userId?: string; action: "find" | "update"; ownerId: string; status: "draft" | "published" }
export function solve(input: Access): boolean {
  return input.role !== "public";
}

