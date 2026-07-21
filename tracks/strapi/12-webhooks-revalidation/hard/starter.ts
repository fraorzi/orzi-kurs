export interface Event { model: string; action: string; documentId: string; locale: string; category?: string }

export function solve(event: Event): string[] {
  if (event.model !== "article" || event.action !== "publish") return [];
  return [
    `article:${event.documentId}`,
    `articles:${event.locale}`,
    `category:${event.category}:${event.locale}`,
  ];
}
