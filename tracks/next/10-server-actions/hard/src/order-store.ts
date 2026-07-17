export async function createOrder(input: {
  readonly customerId: string;
  readonly sku: string;
  readonly quantity: number;
}) {
  return { orderId: `${input.customerId}-${input.sku}-${input.quantity}` };
}
