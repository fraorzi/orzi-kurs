export interface Customer {
  readonly id: string;
  readonly name: string;
}

export function VirtualCustomerList({
  customers,
  onOpen,
}: {
  customers: readonly Customer[];
  onOpen: (id: string) => void;
}) {
  return (
    <div role="list" aria-label="Klienci">
      {customers.map((customer) => (
        <div key={customer.id} role="listitem">
          <button
            type="button"
            onClick={() => onOpen(customer.id)}
          >
            Otwórz {customer.name}
          </button>
        </div>
      ))}
    </div>
  );
}
