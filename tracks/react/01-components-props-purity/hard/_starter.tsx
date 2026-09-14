export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface ProductTableProps {
  products: Product[];
}

export function ProductTable(_props: ProductTableProps) {
  return <section>TODO: cennik</section>;
}
