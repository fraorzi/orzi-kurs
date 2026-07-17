export interface Product {
  readonly id: string;
  readonly name: string;
  readonly price: number;
}

export interface ProductTableProps {
  readonly products: readonly Product[];
}

export function ProductTable(_props: ProductTableProps) {
  return <section>TODO: cennik</section>;
}
