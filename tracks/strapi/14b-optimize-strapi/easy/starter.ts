export function solve() {
  return { status: "published" as const, fields: ["title", "slug", "summary"], populate: "*" };
}

