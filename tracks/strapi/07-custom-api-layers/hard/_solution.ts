export interface Repo { exists(slug: string, exceptId: string): Promise<boolean>; update(id: string, data: object): Promise<object> }
export async function solve(repo: Repo, documentId: string, slug: string): Promise<object> {
  const normalized = slug.trim().toLowerCase();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(normalized)) throw new Error("Nieprawidłowy slug");
  if (await repo.exists(normalized, documentId)) throw new Error("Slug zajęty");
  return repo.update(documentId, { slug: normalized, status: "draft" });
}

