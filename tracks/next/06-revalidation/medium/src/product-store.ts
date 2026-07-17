export async function persistProductName(
  tenantId: string,
  productId: string,
  name: string,
) {
  return { tenantId, productId, name };
}
