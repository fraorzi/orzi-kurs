# Hard — parser odpowiedzi zamówienia

Zaimplementuj `parseOrderResponse(input: unknown)`.

Poprawny model:

```ts
type Order = {
  id: OrderId;                  // "ord_<dodatnia liczba>"
  status: "pending" | "paid" | "cancelled";
  total: number;                // finite, >= 0
  items: readonly {
    sku: string;                // niepusty
    quantity: number;           // dodatnia liczba całkowita
  }[];
};
```

Zwróć wszystkie błędy z pełną ścieżką, np. `"items[1].quantity"`. Brak lub zły typ
`items` daje jeden błąd `"items"`. Bez `any` i assertions poza utworzeniem brandu.
