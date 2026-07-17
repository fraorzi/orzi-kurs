import { useState } from "react";

export interface Product {
  readonly id: string;
  readonly name: string;
}

export interface ProductFilterProps {
  readonly products: readonly Product[];
}

export function ProductFilter({ products }: ProductFilterProps) {
  const [query, setQuery] = useState("");
  const [visibleProducts, setVisibleProducts] = useState(products);

  return (
    <section>
      <label>
        Filtruj produkty
        <input
          value={query}
          onChange={(event) => {
            const nextQuery = event.currentTarget.value;
            setQuery(nextQuery);
            setVisibleProducts(products.filter((product) => (
              product.name.toLowerCase().includes(nextQuery.toLowerCase())
            )));
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
