// Symulacja zewnętrznej deklaracji — nie zmieniaj.
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- celowo niedokładny typ zewnętrznego SDK
export function readSdkInvoice(payload: unknown): any {
  return payload;
}

export function invoiceTotal(payload: unknown): number | null {
  // TODO
  const invoice = readSdkInvoice(payload);
  return invoice.items.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0,
  );
}
