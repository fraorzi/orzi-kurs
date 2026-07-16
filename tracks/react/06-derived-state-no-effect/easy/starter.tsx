import { useState } from "react";

export interface OrderItem {
  readonly id: string;
  readonly quantity: number;
  readonly unitPriceCents: number;
}

export interface OrderSummaryProps {
  readonly items: readonly OrderItem[];
}

export function OrderSummary({ items }: OrderSummaryProps) {
  const [totalCents] = useState(() => (
    items.reduce(
      (sum, item) => sum + item.quantity * item.unitPriceCents,
      0,
    )
  ));

  return (
    <output aria-label="Suma">{(totalCents / 100).toFixed(2)} zł</output>
  );
}
