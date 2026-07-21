export interface Tx {
  begin(): Promise<void>;
  work(): Promise<string>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

const MAX_ATTEMPTS = 3;

export async function transact(tx: Tx): Promise<string> {
  for (let attempt = 1; ; attempt += 1) {
    await tx.begin();
    try {
      const value = await tx.work();
      await tx.commit();
      return value;
    } catch (error) {
      await tx.rollback();
      const deadlock = (error as { code?: string }).code === "ER_LOCK_DEADLOCK";
      if (attempt >= MAX_ATTEMPTS || !deadlock) throw error;
    }
  }
}
