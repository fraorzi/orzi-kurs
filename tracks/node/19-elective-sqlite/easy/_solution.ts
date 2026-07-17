export function solve(filter: {
  status?: string;
  limit?: number;
  order?: string;
}): { sql: string; params: Record<string, string | number> } {
  const order = filter.order ?? "created_at";
  if (!["created_at", "priority"].includes(order))
    throw new Error("Niedozwolone sortowanie");
  const limit = filter.limit ?? 50;
  if (!Number.isInteger(limit) || limit < 1 || limit > 100)
    throw new Error("Błędny limit");
  const where = filter.status ? " WHERE status = $status" : "";
  return {
    sql: `SELECT * FROM jobs${where} ORDER BY ${order} DESC LIMIT $limit`,
    params: {
      ...(filter.status ? { $status: filter.status } : {}),
      $limit: limit,
    },
  };
}
