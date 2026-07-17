import {
  useEffect,
  useState,
} from "react";

export interface ConfirmedOrder {
  readonly quantity: number;
  readonly totalCents: number;
}

export interface OrderCheckoutProps {
  readonly unitPriceCents: number;
  readonly onConfirm: (order: ConfirmedOrder) => void;
}

export function OrderCheckout({
  unitPriceCents,
  onConfirm,
}: OrderCheckoutProps) {
  const [quantity, setQuantity] = useState(1);
  const [shouldConfirm, setShouldConfirm] = useState(false);
  const totalCents = quantity * unitPriceCents;

  useEffect(() => {
    if (shouldConfirm) {
      onConfirm({ quantity, totalCents });
    }
  }, [onConfirm, quantity, shouldConfirm, totalCents]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setShouldConfirm(true);
      }}
    >
      <label>
        Ilość
        <input
          type="number"
          min="0"
          value={quantity}
          onChange={(event) => setQuantity(Number(event.currentTarget.value))}
        />
      </label>
      <output aria-label="Łącznie">{totalCents}</output>
      <button type="submit">Potwierdź zamówienie</button>
    </form>
  );
}
