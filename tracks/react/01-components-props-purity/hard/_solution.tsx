export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface ProductTableProps {
  products: Product[];
}

export function ProductTable({
  products,
}: ProductTableProps) {
  const sortedProducts = [...products].sort(
    (left, right) => left.price - right.price,
  );
  const total = products.reduce(
    (sum, product) => sum + product.price,
    0,
  );

  return (
    <section>
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
