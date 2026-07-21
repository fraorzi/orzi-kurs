export interface Doc { documentId: string; status: "draft" | "published"; title: string; slug: string; secret: string }
export function solve(docs: Doc[], role: "public" | "editor"): object[] {
  return docs
    .filter((doc) => role === "editor" || doc.status === "published")
    .map(({ documentId, status, title, slug }) => ({ documentId, status, title, slug }));
}

