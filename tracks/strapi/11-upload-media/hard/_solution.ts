export interface MediaDeps { authorize(): Promise<boolean>; upload(): Promise<string>; link(id: string): Promise<void>; remove(id: string): Promise<void> }
export async function solve(deps: MediaDeps): Promise<string> {
  if (!await deps.authorize()) throw new Error("Forbidden");
  const id = await deps.upload();
  try {
    await deps.link(id);
    return id;
  } catch (error) {
    await deps.remove(id);
    throw error;
  }
}

