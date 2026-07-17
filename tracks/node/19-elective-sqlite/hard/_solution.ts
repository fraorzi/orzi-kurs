export function solve(
  current: number,
  migrations: readonly { version: number; sql: string }[],
): { version: number; sql: string }[] {
  const sorted = [...migrations].sort(
    (left, right) => left.version - right.version,
  );
  const seen = new Set<number>();
  for (const migration of sorted) {
    if (
      !Number.isInteger(migration.version) ||
      migration.version < 1 ||
      seen.has(migration.version)
    )
      throw new Error("Nieprawidłowe wersje migracji");
    seen.add(migration.version);
  }
  const pending = sorted.filter((migration) => migration.version > current);
  for (let index = 0; index < pending.length; index++)
    if (pending[index]?.version !== current + index + 1)
      throw new Error("Luka w migracjach");
  return pending;
}
