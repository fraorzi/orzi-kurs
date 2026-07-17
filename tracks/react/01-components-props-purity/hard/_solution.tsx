export interface Product {
  readonly id: string;
  readonly name: string;
  readonly price: number;
}

export interface ProductTableProps {
  readonly products: readonly Product[];
}

export function ProductTable({ products }: ProductTableProps) {
  const sortedProducts = [...products].sort(
    (left, right) => left.price - right.price,
  );
  const total = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <section aria-label="Cennik">
      <ul>
        {sortedProducts.map((product) => (
          <li key={product.id}>
            {product.name}: {product.price.toFixed(2)} zł
          </li>
        ))}
      </ul>
      <p>Razem: {total.toFixed(2)} zł</p>
    </section>
  );
}
