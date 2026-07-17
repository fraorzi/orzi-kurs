export function solve(
  db: {
    exec(sql: string): void;
    run(sql: string, amount: number, id: string): { changes: number };
  },
  from: string,
  to: string,
  amount: number,
): void {
  if (!Number.isFinite(amount) || amount <= 0) throw new Error("Błędna kwota");
  db.exec("BEGIN IMMEDIATE");
  try {
    const debit = db.run(
      "UPDATE accounts SET balance = balance - ? WHERE id = ? AND balance >= ?",
      amount,
      from,
    );
    if (debit.changes !== 1) throw new Error("Brak środków");
    const credit = db.run(
      "UPDATE accounts SET balance = balance + ? WHERE id = ?",
      amount,
      to,
    );
    if (credit.changes !== 1) throw new Error("Brak konta docelowego");
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}
