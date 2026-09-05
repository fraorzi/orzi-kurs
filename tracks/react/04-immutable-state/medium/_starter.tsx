import { useState } from "react";

export interface CartItem {
  readonly id: string;
  readonly name: string;
  quantity: number;
}

export interface ShoppingCartProps {
  initialItems: readonly CartItem[];
}

export function increaseQuantity(
  items: CartItem[],
  id: string,
): CartItem[] {
  // TODO: zwróć nową tablicę bez zmiany danych wejściowych.
  throw new Error("TODO");
}

export function removeItem(
  items: CartItem[],
  id: string,
): CartItem[] {
  // TODO: zwróć nową tablicę bez zmiany danych wejściowych.
  throw new Error("TODO");
}

export function ShoppingCart({
  initialItems,
}: ShoppingCartProps) {
  const [items, setItems] = useState(() =>
    initialItems.map((item) => ({ ...item })),
  );

  function increase(id: string) {
    setItems((current) => increaseQuantity(current, id));
  }

  function remove(id: string) {
    setItems((current) => removeItem(current, id));
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <span>{item.name}</span>
          <output aria-label={`Ilość ${item.name}`}>
            {item.quantity}
          </output>
          <button
            type="button"
            onClick={() => increase(item.id)}
          >
            Zwiększ {item.name}
          </button>
          <button
            type="button"
            onClick={() => remove(item.id)}
          >
            Usuń {item.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
