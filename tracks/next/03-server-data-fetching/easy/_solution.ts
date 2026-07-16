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

function parseProduct(value: unknown): Product {
  if (
    typeof value !== "object" ||
    value === null ||
    !("id" in value) ||
    typeof value.id !== "string" ||
    value.id.trim() === "" ||
    !("name" in value) ||
    typeof value.name !== "string" ||
    value.name.trim() === "" ||
    !("price" in value) ||
    typeof value.price !== "number" ||
    !Number.isFinite(value.price) ||
    value.price < 0
  ) {
    throw new Error("Nieprawidłowy produkt w odpowiedzi API");
  }

  return { id: value.id, name: value.name, price: value.price };
}

export async function loadProducts(
  fetcher: ProductFetcher,
  url = "/api/products",
): Promise<readonly Product[]> {
  const response = await fetcher(url);
  if (!response.ok) {
    throw new Error(`Nie udało się pobrać produktów: HTTP ${response.status}`);
  }

  const payload: unknown = await response.json();
  if (!Array.isArray(payload)) {
    throw new Error("Odpowiedź API nie jest tablicą produktów");
  }

  return payload.map(parseProduct);
}
