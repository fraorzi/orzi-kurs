export interface Tx { begin(): Promise<void>; work(): Promise<string>; commit(): Promise<void>; rollback(): Promise<void> }
export async function transact(tx: Tx): Promise<string> {
  for (let attempt = 1; ; attempt += 1) { await tx.begin(); try { const value = await tx.work(); await tx.commit(); return value; } catch (error) { await tx.rollback(); if (attempt >= 3 || (error as { code?: string }).code !== "ER_LOCK_DEADLOCK") throw error; } }
}

