import { useState } from "react";

export interface Product {
  readonly id: string;
  readonly name: string;
}

export interface ProductFilterProps {
  products: readonly Product[];
}

export function ProductFilter({
  products,
}: ProductFilterProps) {
  const [query, setQuery] = useState("");

  const visibleProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  return (
    <section>
      <label>
        Filtruj produkty
        <input
          value={query}
          onChange={(event) => {
            const nextQuery = event.currentTarget.value;
            setQuery(nextQuery);
          }}
        />
      </label>
      <ul aria-label="Produkty">
        {visibleProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </section>
  );
}
