import { useMemo } from "react";
import {
  List,
  type RowComponentProps,
} from "react-window";

export interface Customer {
  readonly id: string;
  readonly name: string;
}

interface CustomerRowProps {
  readonly customers: readonly Customer[];
  readonly onOpen: (id: string) => void;
}

function CustomerRow({
  ariaAttributes,
  customers,
  index,
  onOpen,
  style,
}: RowComponentProps<CustomerRowProps>) {
  const customer = customers[index];

  return (
    <div style={style} {...ariaAttributes}>
      <button type="button" onClick={() => onOpen(customer.id)}>
        Otwórz {customer.name}
      </button>
    </div>
  );
}

export function VirtualCustomerList({
  customers,
  onOpen,
}: {
  readonly customers: readonly Customer[];
  readonly onOpen: (id: string) => void;
}) {
  const rowProps = useMemo(
    () => ({ customers, onOpen }),
    [customers, onOpen],
  );

  return (
    <List
      aria-label="Klienci"
      defaultHeight={108}
      overscanCount={1}
      rowComponent={CustomerRow}
      rowCount={customers.length}
      rowHeight={36}
      rowProps={rowProps}
      style={{ height: 108, width: 320 }}
    />
  );
}
