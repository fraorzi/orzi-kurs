export interface Tx { update(): Promise<void>; audit(): Promise<void>; commit(): Promise<void>; rollback(): Promise<void> }
export async function solve(tx: Tx): Promise<void> {
  await tx.update();
  await tx.audit();
  await tx.commit();
}

