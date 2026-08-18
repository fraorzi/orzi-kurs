export interface Product {
  readonly id: string;
  readonly name: string;
  readonly price: number;
}

export interface ProductTableProps {
  readonly products: readonly Product[];
}

export function ProductTable({
  products,
}: ProductTableProps) {
  const sortedProducts = [...products].sort(
    (a, b) => a.price - b.price,
  );
  const sum = sortedProducts.reduce(
    (sum, product) => sum + product.price,
    0,
  );
  return (
    <section aria-label="Cennik">
      <ol>
        {sortedProducts.map((product) => (
          <li key={product.id}>
            {product.name}: {product.price.toFixed(2)} zł
          </li>
        ))}
      </ol>
      <p>Razem: {sum.toFixed(2)} zł</p>
    </section>
  );
}
