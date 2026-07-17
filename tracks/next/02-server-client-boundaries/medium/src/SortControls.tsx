"use client";

import { useState } from "react";
import type { Product } from "./types";

export function SortControls({
  products,
  compare,
}: {
  readonly products: readonly Product[];
  readonly compare: (left: Product, right: Product) => number;
}) {
  const [sort, setSort] = useState<"server" | "price">("server");
  const visibleProducts = [...products].sort(
    sort === "price" ? (left, right) => left.price - right.price : compare,
  );

  return (
    <section>
      <label>
        Sortowanie
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value as "server" | "price")}
        >
          <option value="server">Nazwa</option>
          <option value="price">Cena</option>
        </select>
      </label>
      <ul aria-label="Produkty">
        {visibleProducts.map((product) => <li key={product.id}>{product.name}</li>)}
      </ul>
    </section>
  );
}
