export function solve(
  db: {
    exec(sql: string): void;
    run(sql: string, amount: number, id: string): { changes: number };
  },
  from: string,
  to: string,
  amount: number,
): void {
  throw new Error("TODO");
}
