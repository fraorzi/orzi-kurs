type RawSearch = Record<string, string | string[] | undefined>;

export interface CatalogState {
  readonly query: string;
  readonly sort: "relevance" | "price-asc" | "price-desc";
  readonly page: number;
  readonly previousHref: string | null;
  readonly nextHref: string | null;
}

export async function readCatalogState(
  searchParams: Promise<RawSearch>,
  totalPages: number,
): Promise<CatalogState> {
  await searchParams;
  return { query: "", sort: "relevance", page: 1, previousHref: null, nextHref: null };
}
