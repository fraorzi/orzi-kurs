export interface MediaDeps { authorize(): Promise<boolean>; upload(): Promise<string>; link(id: string): Promise<void>; remove(id: string): Promise<void> }
export async function solve(deps: MediaDeps): Promise<string> {
  const id = await deps.upload();
  await deps.link(id);
  return id;
}

