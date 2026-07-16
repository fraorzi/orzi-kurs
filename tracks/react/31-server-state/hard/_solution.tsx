import { useMutation, useQuery } from "@tanstack/react-query";

export interface Stock {
  readonly productId: string;
  readonly quantity: number;
}

export function StockControl({
  productId,
  fetchStock,
  updateStock,
}: {
  readonly productId: string;
  readonly fetchStock: (productId: string) => Promise<Stock>;
  readonly updateStock: (quantity: number) => Promise<void>;
}) {
  const queryKey = ["stock", productId] as const;
  const stock = useQuery({
    queryKey,
    queryFn: () => fetchStock(productId),
  });
  const updateMutation = useMutation({
    mutationFn: updateStock,
    onMutate: async (quantity, context) => {
      await context.client.cancelQueries({ queryKey });
      const previousStock = context.client.getQueryData<Stock>(queryKey);
      context.client.setQueryData<Stock>(queryKey, (current) => current && ({
        ...current,
        quantity,
      }));
      return { previousStock };
    },
    onError: (_error, _quantity, result, context) => {
      if (result?.previousStock) {
        context.client.setQueryData(queryKey, result.previousStock);
      }
    },
    onSettled: (_data, _error, _quantity, _result, context) =>
      context.client.invalidateQueries({ queryKey }),
  });

  if (stock.isPending) return <p>Ładowanie stanu…</p>;
  if (stock.isError) return <p role="alert">Nie udało się pobrać stanu.</p>;

  return (
    <section aria-label="Stan magazynowy">
      <output aria-label="Ilość">{stock.data.quantity}</output>
      <button
        type="button"
        disabled={stock.data.quantity === 0 || updateMutation.isPending}
        onClick={() => updateMutation.mutate(stock.data.quantity - 1)}
      >
        Zmniejsz stan
      </button>
      {updateMutation.isError && <p role="alert">Nie udało się zapisać stanu.</p>}
    </section>
  );
}
