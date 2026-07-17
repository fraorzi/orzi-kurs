type RawSearch = Record<string, string | string[] | undefined>;

export interface CatalogState {
  readonly query: string;
  readonly sort: "relevance" | "price-asc" | "price-desc";
  readonly page: number;
  readonly previousHref: string | null;
  readonly nextHref: string | null;
}

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export async function readCatalogState(
  searchParams: Promise<RawSearch>,
  totalPages: number,
): Promise<CatalogState> {
  const raw = await searchParams;
  const query = first(raw.query)?.trim() ?? "";
  const rawSort = first(raw.sort);
  const sort = rawSort === "price-asc" || rawSort === "price-desc" ? rawSort : "relevance";
  const candidate = Number(first(raw.page));
  const page = Math.min(
    Number.isInteger(candidate) && candidate > 0 ? candidate : 1,
    Math.max(1, totalPages),
  );

  function hrefFor(target: number): string {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (sort !== "relevance") params.set("sort", sort);
    if (target > 1) params.set("page", String(target));
    return params.size ? `/catalog?${params}` : "/catalog";
  }

  return {
    query,
    sort,
    page,
    previousHref: page > 1 ? hrefFor(page - 1) : null,
    nextHref: page < totalPages ? hrefFor(page + 1) : null,
  };
}
