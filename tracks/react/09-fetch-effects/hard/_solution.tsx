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

type ProductResult =
  | {
      readonly productId: string;
      readonly status: "success";
      readonly product: Product;
    }
  | {
      readonly productId: string;
      readonly status: "error";
    };

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
        if (!controller.signal.aborted) {
          setResult({
            productId,
            status: "success",
            product,
          });
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setResult({ productId, status: "error" });
        }
      });

    return () => {
      controller.abort();
    };
  }, [client, productId]);

  if (!currentResult) {
    return <p>Ładowanie produktu…</p>;
  }
  if (currentResult.status === "error") {
    return (
      <p role="alert">Nie udało się pobrać produktu.</p>
    );
  }
  return <h1>{currentResult.product.name}</h1>;
}
