export interface Tx {
  begin(): Promise<void>;
  work(): Promise<string>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

export async function transact(tx: Tx): Promise<string> {
  await tx.begin();
  const value = await tx.work();
  await tx.commit();
  return value;
}
