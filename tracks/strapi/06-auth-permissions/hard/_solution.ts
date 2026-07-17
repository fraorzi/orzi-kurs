export interface Access { role: "admin" | "editor" | "public"; userId?: string; action: "find" | "update"; ownerId: string; status: "draft" | "published" }
export function solve(input: Access): boolean {
  if (input.role === "admin") return true;
  if (input.role === "public") return input.action === "find" && input.status === "published";
  return input.action === "update" && input.userId === input.ownerId;
}

