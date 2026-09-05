import { useState } from "react";

export interface ConfirmedOrder {
  readonly quantity: number;
  readonly totalCents: number;
}

export interface OrderCheckoutProps {
  unitPriceCents: number;
  onConfirm: (order: ConfirmedOrder) => void;
}

export function OrderCheckout({
  unitPriceCents,
  onConfirm,
}: OrderCheckoutProps) {
  const [quantity, setQuantity] = useState(1);
  const totalCents = quantity * unitPriceCents;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onConfirm({ quantity, totalCents });
      }}
    >
      <label>
        Ilość
        <input
          type="number"
          min="0"
          value={quantity}
          onChange={(event) =>
            setQuantity(Number(event.currentTarget.value))
          }
        />
      </label>
      <output aria-label="Łącznie">{totalCents}</output>
      <button type="submit">Potwierdź zamówienie</button>
    </form>
  );
}
