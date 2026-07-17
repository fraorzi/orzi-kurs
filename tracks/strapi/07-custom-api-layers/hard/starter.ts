export interface Repo { exists(slug: string, exceptId: string): Promise<boolean>; update(id: string, data: object): Promise<object> }
export async function solve(repo: Repo, documentId: string, slug: string): Promise<object> {
  return repo.update(documentId, { slug });
}

