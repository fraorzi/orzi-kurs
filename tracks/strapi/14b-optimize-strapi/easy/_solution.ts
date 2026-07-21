export function solve(): { status: "published"; fields: string[]; populate: Record<string, { fields: string[] }> } {
  return { status: "published", fields: ["title", "slug"], populate: { cover: { fields: ["url", "alternativeText"] } } };
}

