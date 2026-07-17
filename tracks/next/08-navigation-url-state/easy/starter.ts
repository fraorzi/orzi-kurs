export interface CatalogQueryChange {
  readonly query?: string;
  readonly sort?: "relevance" | "price-asc" | "price-desc";
  readonly page?: number;
}

export function patchCatalogQuery(
  current: string,
  change: CatalogQueryChange,
): string {
  const params = new URLSearchParams();
  if (change.query) params.set("query", change.query);
  if (change.sort) params.set("sort", change.sort);
  if (change.page) params.set("page", String(change.page));
  return params.toString() || current;
}
