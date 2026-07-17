export function solve(action: string, params: Record<string, unknown>, tenantId: string): Record<string, unknown> {
  if (action !== "findMany") return params;
  const filters = typeof params.filters === "object" && params.filters !== null ? params.filters : {};
  return { ...params, status: "published", filters: { ...filters, tenantId } };
}

