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
  await deps.update({ documentId, data: { title } });
}
