export interface Invoice {
  readonly id: string;
  readonly customer: string;
  readonly amount: number;
}

export function ModernInvoiceTable({
  invoices,
}: {
  invoices: readonly Invoice[];
}) {
  "use memo";

  const total = invoices.reduce(
    (sum, invoice) => sum + invoice.amount,
    0,
  );

  return (
    <section aria-label="Faktury">
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            {invoice.customer}: {invoice.amount} zł
          </li>
        ))}
      </ul>
      <strong>Razem: {total} zł</strong>
    </section>
  );
}

export function LegacyCounter({
  value,
}: {
  value: number;
}) {
  return <p>Licznik legacy: {value}</p>;
}
