export interface Product {
  readonly tenantId: string;
  readonly slug: string;
  readonly name: string;
}

export async function readProduct(tenantId: string, slug: string): Promise<Product> {
  return { tenantId, slug, name: "Klawiatura" };
}
