export function projectRows<T extends object, K extends keyof T>(
  rows: readonly T[],
  keys: readonly K[],
): Array<Pick<T, K>> {
  return rows.map((row) => {
    const projected = {} as Pick<T, K>;
    for (const key of keys) projected[key] = row[key];
    return projected;
  });
}
