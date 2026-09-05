import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";

export interface Stock {
  readonly productId: string;
  readonly quantity: number;
}

export function StockControl({
  productId,
  fetchStock,
  updateStock,
}: {
  productId: string;
  fetchStock: (productId: string) => Promise<Stock>;
  updateStock: (quantity: number) => Promise<void>;
}) {
  const stock = useQuery({
    queryKey: ["stock", productId],
    queryFn: () => fetchStock(productId),
  });
  const updateMutation = useMutation({
    mutationFn: updateStock,
  });

  if (stock.isPending) return <p>Ładowanie stanu…</p>;
  if (stock.isError)
    return <p role="alert">Nie udało się pobrać stanu.</p>;

  return (
    <section aria-label="Stan magazynowy">
      <output aria-label="Ilość">
        {stock.data.quantity}
      </output>
      <button
        type="button"
        disabled={
          stock.data.quantity === 0 ||
          updateMutation.isPending
        }
        onClick={() =>
          updateMutation.mutate(stock.data.quantity - 1)
        }
      >
        Zmniejsz stan
      </button>
      {updateMutation.isError && (
        <p role="alert">Nie udało się zapisać stanu.</p>
      )}
    </section>
  );
}
