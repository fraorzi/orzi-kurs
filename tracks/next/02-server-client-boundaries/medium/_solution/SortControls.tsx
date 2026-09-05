"use client";

import { useState } from "react";
import type { Product } from "./types";

export function SortControls({
  products,
}: {
  products: readonly Product[];
}) {
  const [sort, setSort] = useState<"name" | "price">(
    "name",
  );
  const visibleProducts = [...products].sort(
    (left, right) =>
      sort === "price"
        ? left.price - right.price
        : left.name.localeCompare(right.name),
  );

  return (
    <section>
      <label>
        Sortowanie
        <select
          value={sort}
          onChange={(event) =>
            setSort(event.target.value as "name" | "price")
          }
        >
          <option value="name">Nazwa</option>
          <option value="price">Cena</option>
        </select>
      </label>
      <ul aria-label="Produkty">
        {visibleProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </section>
  );
}
