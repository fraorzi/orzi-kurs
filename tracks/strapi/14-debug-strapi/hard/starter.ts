export interface Doc { documentId: string; status: "draft" | "published"; title: string; slug: string; secret: string }
export function solve(docs: Doc[], role: "public" | "editor"): object[] {
  return docs;
}

