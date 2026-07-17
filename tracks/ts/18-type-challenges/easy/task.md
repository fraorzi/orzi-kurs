# Easy — handlery z unii eventów

Zaimplementuj `EventHandlers<Event>`. Dla każdego elementu unii rozłącznej utwórz
właściwość o nazwie z pola `type`, której wartością jest handler przyjmujący wyłącznie
ten konkretny wariant eventu.

```ts
type AppEvent =
  | { type: "user.created"; userId: string }
  | { type: "invoice.paid"; invoiceId: number; amount: number };

type Handlers = EventHandlers<AppEvent>;
// {
//   "user.created": (event: { type: "user.created"; userId: string }) => void;
//   "invoice.paid": (event: { type: "invoice.paid"; ... }) => void;
// }
```

Wymagania:

- zachowaj korelację klucza z odpowiednim wariantem unii,
- nie używaj `any`,
- wynik ma wymagać wszystkich handlerów,
- rozwiązanie powinno działać dla dowolnej unii z polem `type: string`.
