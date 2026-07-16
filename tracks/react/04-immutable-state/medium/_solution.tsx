import { useState } from "react";

export interface CartItem {
  readonly id: string;
  readonly name: string;
  readonly quantity: number;
}

export interface ShoppingCartProps {
  readonly initialItems: readonly CartItem[];
}

export function ShoppingCart({ initialItems }: ShoppingCartProps) {
  const [items, setItems] = useState(() => (
    initialItems.map((item) => ({ ...item }))
  ));

  function increase(id: string) {
    setItems((current) => (
      current.map((item) => (
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    ));
  }

  function remove(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <span>{item.name}</span>
          <output aria-label={`Ilość ${item.name}`}>{item.quantity}</output>
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
