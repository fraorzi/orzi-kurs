export function solve(documentId: string, locale: string, category?: string): string[] {
  return ["content", "article:" + documentId, "articles:" + locale, category ? "category:" + category + ":" + locale : ""].filter(Boolean);
}

