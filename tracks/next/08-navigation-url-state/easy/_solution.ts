export interface CatalogQueryChange {
  readonly query?: string;
  readonly sort?: "relevance" | "price-asc" | "price-desc";
  readonly page?: number;
}

export function patchCatalogQuery(
  current: string,
  change: CatalogQueryChange,
): string {
  const params = new URLSearchParams(current);

  if ("query" in change) {
    const query = change.query?.trim() ?? "";
    if (query) params.set("query", query);
    else params.delete("query");
    params.delete("page");
  }

  if ("sort" in change) {
    if (change.sort && change.sort !== "relevance") params.set("sort", change.sort);
    else params.delete("sort");
    params.delete("page");
  }

  if ("page" in change) {
    if (change.page && change.page > 1) params.set("page", String(change.page));
    else params.delete("page");
  }

  return params.toString();
}
