export function solve(documentId: string, locale: string, category?: string): string[] {
  return ["article:" + documentId, "articles:" + locale, category ? "category:" + category + ":" + locale : ""].filter(Boolean);
}

