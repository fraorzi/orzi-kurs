# Moduł 02 - odporny, typowany klient API

Tryb: projekt. Uzupełnij pliki w `src/`. Gotowe typy i połączenia między plikami są punktem wyjścia.

Zadanie jest **wieloplikowe**. Uzupełnij pliki w `src/`; testy importują wyłącznie
z `src/index.ts`, więc ten plik jest publiczną granicą modułu.

Projekt działa z włączonymi:

- `exactOptionalPropertyTypes`,
- `noUncheckedIndexedAccess`,
- `useUnknownInCatchVariables`,
- `verbatimModuleSyntax`.

Nie używaj `any` ani non-null assertions. Assertion `as OrderId` jest dozwolone
wyłącznie wewnątrz parsera, po sprawdzeniu formatu identyfikatora.

## `src/types.ts` - kontrakty

Zdefiniuj i eksportuj:

```ts
type Result<T, E> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E };

type ParseResult<T> = Result<T, readonly string[]>;
type Parser<T> = (input: unknown) => ParseResult<T>;

type OrderId = string & { readonly [orderIdBrand]: "OrderId" };
type OrderStatus = "pending" | "paid" | "cancelled";

interface OrderItem {
  readonly sku: string;
  readonly quantity: number;
}

interface Order {
  readonly id: OrderId;
  readonly status: OrderStatus;
  readonly total: number;
  readonly items: readonly OrderItem[];
}
```

`ApiError` ma być unią rozłączną:

```ts
{ kind: "aborted"; reason: "external" | "timeout" }
{ kind: "http"; status: number }
{ kind: "invalid-response"; errors: readonly string[] }
{ kind: "network"; message: string }
```

Dodatkowo zdefiniuj kontrakty `FetchLike`, `RequestOptions`, `OrderClientOptions`
i `OrderClient` zgodne z API używanym w testach.

## `src/parse.ts` - granica runtime

Eksportuj:

```ts
parseOrderId(input: unknown): ParseResult<OrderId>
parseOrder(input: unknown): ParseResult<Order>
parseOrderList(input: unknown): ParseResult<readonly Order[]>
```

Format identyfikatora to `ord_` i dokładnie sześć małych liter lub cyfr.

Parser zamówienia:

- odrzuca wartości, które nie są zwykłym obiektem,
- wymaga poprawnych `id`, `status`, `total` i `items`,
- `total` jest skończoną liczbą `>= 0`,
- `items` jest tablicą elementów z niepustym `sku` i całkowitym `quantity > 0`,
- zbiera wszystkie błędy zamiast zatrzymywać się na pierwszym,
- zwraca nowy obiekt zawierający wyłącznie znane pola.

`parseOrderList` prefiksuje błędy indeksem, np.
`"[1].id ma format ord_xxxxxx"`.

Komunikaty są częścią kontraktu - odczytaj ich dokładne brzmienie z testów.

## `src/queue.ts` - generyczny limit współbieżności

```ts
interface TaskQueue {
  add<T>(task: () => Promise<T>): Promise<T>;
  readonly active: number;
  readonly pending: number;
}

createTaskQueue(concurrency?: number): TaskQueue
```

- `concurrency` musi być dodatnią liczbą całkowitą, inaczej rzuć `RangeError`,
- kolejka uruchamia najwyżej tyle zadań naraz,
- `add` zachowuje typ wyniku każdego zadania,
- slot jest zwalniany po resolve, reject i błędzie synchronicznym.

## `src/client.ts` - transport i polityka odporności

```ts
createOrderClient(options: OrderClientOptions): OrderClient
```

Opcje:

- `baseUrl` i `fetchImpl` są wymagane,
- domyślnie: `concurrency = 4`, `retries = 2`, `backoffMs = 50`,
  `timeoutMs = 1000`,
- `sleep` jest wstrzykiwane dla deterministycznych testów backoffu.

Klient wystawia:

```ts
getOrder(id: OrderId, options?: RequestOptions):
  Promise<Result<Order, ApiError>>

listOrders(options?: RequestOptions):
  Promise<Result<readonly Order[], ApiError>>

readonly active: number
readonly pending: number
```

Zasady:

- każde wywołanie przechodzi przez wspólną kolejkę,
- 4xx kończy się od razu błędem `http`,
- 5xx i błędy sieci są ponawiane do `retries`,
- backoff przed próbami 2, 3, ... wynosi `backoffMs`, `2 * backoffMs`, ...,
- anulowanie i timeout nigdy nie są ponawiane,
- błędny JSON lub odpowiedź niezgodna z parserem daje `invalid-response`,
- oczekiwane porażki są zwracane jako `Result`, a nie rzucane,
- timer i listener zewnętrznego sygnału są zawsze sprzątane.

## `src/index.ts` - publiczne API

Re-eksportuj funkcje runtime oraz wszystkie publiczne typy. Przy
`verbatimModuleSyntax` typy muszą być eksportowane przez `export type`.
