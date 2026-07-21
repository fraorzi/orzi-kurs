export interface Event { model: string; action: string; documentId: string; locale: string; category?: string }
export function solve(event: Event): string[] {
  if (event.model !== "article" || !["publish", "unpublish"].includes(event.action)) return [];
  return [...new Set([`article:${event.documentId}`, `articles:${event.locale}`, event.category ? `category:${event.category}:${event.locale}` : ""])].filter(Boolean);
}

