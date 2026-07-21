export interface Deps {
  owner(id: string): Promise<string>;
  update(input: object): Promise<void>;
  revalidate(tag: string): void;
}

export async function updateArticle(
  deps: Deps,
  userId: string,
  documentId: string,
  title: unknown,
): Promise<void> {
  if (!/^[A-Za-z0-9]{24}$/.test(documentId)) {
    throw new Error("Invalid documentId");
  }
  if (typeof title !== "string" || title.trim().length < 3) {
    throw new Error("Invalid title");
  }
  if ((await deps.owner(documentId)) !== userId) {
    throw new Error("Not found");
  }

  await deps.update({ documentId, data: { title: title.trim() } });
  deps.revalidate("article:" + documentId);
  deps.revalidate("articles");
}
