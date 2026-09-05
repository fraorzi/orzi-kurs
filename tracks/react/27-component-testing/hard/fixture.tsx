export interface Invoice {
  readonly customer: string;
  readonly id: string;
  readonly total: number;
}

export function InvoiceList({
  invoices,
  layout,
  onOpen,
}: {
  invoices: readonly Invoice[];
  layout: "table" | "cards";
  onOpen: (id: string) => void;
}) {
  if (layout === "cards") {
    return (
      <section aria-label="Faktury">
        {invoices.map((invoice) => (
          <article key={invoice.id}>
            <h2>{invoice.customer}</h2>
            <p>{invoice.total} zł</p>
            <button
              type="button"
              aria-label={`Otwórz fakturę ${invoice.customer}`}
              onClick={() => onOpen(invoice.id)}
            >
              Szczegóły
            </button>
          </article>
        ))}
      </section>
    );
  }

  return (
    <table aria-label="Faktury">
      <thead>
        <tr>
          <th>Klient</th>
          <th>Kwota</th>
          <th>Akcja</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => (
          <tr key={invoice.id}>
            <td>{invoice.customer}</td>
            <td>{invoice.total} zł</td>
            <td>
              <button
                type="button"
                aria-label={`Otwórz fakturę ${invoice.customer}`}
                onClick={() => onOpen(invoice.id)}
              >
                Otwórz
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
