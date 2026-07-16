// Symulacja zewnętrznej deklaracji — nie zmieniaj.
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- celowo niedokładny typ zewnętrznego SDK
export function readSdkInvoice(payload: unknown): any {
  return payload;
}

function isItem(value: unknown): value is { price: number; quantity: number } {
  return (
    typeof value === "object" &&
    value !== null &&
    "price" in value &&
    typeof value.price === "number" &&
    "quantity" in value &&
    typeof value.quantity === "number"
  );
}

export function invoiceTotal(payload: unknown): number | null {
  const invoice: unknown = readSdkInvoice(payload);
  if (
    typeof invoice !== "object" ||
    invoice === null ||
    !("items" in invoice) ||
    !Array.isArray(invoice.items) ||
    !invoice.items.every(isItem)
  ) {
    return null;
  }
  return invoice.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
}
