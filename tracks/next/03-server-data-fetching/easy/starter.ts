export interface Product {
  readonly id: string;
  readonly name: string;
  readonly price: number;
}

export interface ProductResponse {
  readonly ok: boolean;
  readonly status: number;
  json(): Promise<unknown>;
}

export type ProductFetcher = (url: string) => Promise<ProductResponse>;

export async function loadProducts(
  fetcher: ProductFetcher,
  url = "/api/products",
): Promise<readonly Product[]> {
  const response = await fetcher(url);
  return response.json() as Promise<readonly Product[]>;
}
