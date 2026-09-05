import { useState } from "react";

export interface CartItem {
  readonly id: string;
  readonly name: string;
  quantity: number;
}

export interface ShoppingCartProps {
  readonly initialItems: readonly CartItem[];
}

export function ShoppingCart({
  initialItems,
}: ShoppingCartProps) {
  const [items, setItems] = useState(() =>
    initialItems.map((item) => ({ ...item })),
  );

  function increase(id: string) {
    const item = items.find(
      (candidate) => candidate.id === id,
    );
    if (item) {
      item.quantity += 1;
      setItems([...items]);
    }
  }

  function remove(id: string) {
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
      items.splice(index, 1);
      setItems([...items]);
    }
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
