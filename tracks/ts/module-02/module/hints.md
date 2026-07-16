## Hint 1

Najpierw doprowadź do porządku `types.ts`. Unia z literalnym `ok` pozwoli zawężać
wynik, a literalne `kind` zrobi to samo z błędem:

```ts
if (!result.ok) {
  if (result.error.kind === "http") {
    console.log(result.error.status);
  }
}
```

Nie zastępuj tej unii jednym interfejsem z opcjonalnymi polami.

## Hint 2

Parsery powinny pracować od `unknown` przez małe strażniki:

```ts
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
```

Najpierw zbierz błędy, potem ponownie sprawdź warunki w jednym `if`. Dopiero za nim
TypeScript będzie miał dowód potrzebny do zbudowania `Order`.

## Hint 3

Brand nie powstaje magicznie. Jedno kontrolowane assertion po walidacji jest
bezpieczną „bramą wejściową”:

```ts
if (typeof input !== "string" || !ORDER_ID_RE.test(input)) {
  return { ok: false, error: ["id ma format ord_xxxxxx"] };
}
return { ok: true, value: input as OrderId };
```

Poza tym miejscem kod aplikacji powinien otrzymywać `OrderId` z parsera, nie
produkować go assertion.

## Hint 4

Kolejka nie musi przechowywać `Promise<unknown>`. Przechowuj funkcje startujące
zadanie:

```ts
const jobs: Array<() => void> = [];
```

`add<T>` tworzy własną obietnicę i wkłada do kolejki closure, które nadal zna `T`,
`resolve` i `reject`. W `finally` zmniejsz `active` i uruchom `pump()`.

Jeżeli callbacki zaczną przekraczać limit zagnieżdżenia lintu, zamodeluj
`QueuedJob` z metodą `run(): Promise<void>` i generyczną klasę `TypedJob<T>`.
Typ `T` zostaje wtedy zamknięty w obiekcie zadania, a kolejka przechowuje jednolity
interfejs bez `any`.

## Hint 5

Rozdziel pojedynczą próbę transportu od pętli retry. Pojedyncza próba odpowiada za:

1. utworzenie `AbortController`,
2. propagację zewnętrznego sygnału,
3. timer timeoutu,
4. wywołanie `fetchImpl`,
5. cleanup w `finally`.

Pętla retry decyduje dopiero, czy dany wynik zasługuje na następną próbę.

## Hint 6

Nie obejmuj jednym `try/catch` całej obsługi odpowiedzi. Odróżnij:

- wyjątek z transportu — kandydat do retry,
- `response.ok === false` — decyzja na podstawie statusu,
- wyjątek z `response.json()` — niepoprawny JSON,
- `{ ok: false }` z parsera — poprawny JSON, ale zły kontrakt domenowy.

To cztery różne klasy problemów i powinny dawać różne zachowanie.

## Hint 7

Backoff licz przed kolejną próbą:

```ts
await sleep(backoffMs * 2 ** (attempt - 1));
```

Jeżeli `attempt` zaczyna się od zera, pierwsza przerwa występuje dla `attempt === 1`
i ma wartość `backoffMs`.

## Hint 8

Wewnętrzna funkcja `request<T>(path, parser, options)` może obsłużyć wspólny
mechanizm, a publiczne metody tylko wybierają endpoint i parser:

```ts
getOrder: (id, options) => request(`/orders/${id}`, parseOrder, options)
```

Dzięki generykowi jeden mechanizm zachowuje dokładny wynik `Order` lub
`readonly Order[]`.
