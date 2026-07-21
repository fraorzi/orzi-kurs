export interface Entry { id: number; documentId: string; locale: string; status: "draft" | "published"; title: string }
export function solve(entries: Entry[], documentId: string, locale: string, status: Entry["status"]): Entry | null {
  return entries.find((entry) => entry.documentId === documentId && entry.locale === locale && entry.status === status) ?? null;
}

