import { useEffect, useState } from "react";

export interface Product {
  readonly id: string;
  readonly name: string;
}

export interface ProductClient {
  load(
    productId: string,
    signal: AbortSignal,
  ): Promise<Product>;
}

export interface ProductDetailsProps {
  productId: string;
  client: ProductClient;
}

interface ProductResult {
  readonly productId: string;
  readonly product: Product;
}

export function ProductDetails({
  productId,
  client,
}: ProductDetailsProps) {
  const [result, setResult] =
    useState<ProductResult | null>(null);
  const currentResult =
    result?.productId === productId ? result : null;

  useEffect(() => {
    const controller = new AbortController();
    client
      .load(productId, controller.signal)
      .then((product) => {
        setResult({ productId, product });
      });
  }, [client, productId]);

  return currentResult ? (
    <h1>{currentResult.product.name}</h1>
  ) : (
    <p>Ładowanie produktu…</p>
  );
}
