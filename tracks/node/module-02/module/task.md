# Moduł — rdzeń usługi HTTP z idempotencją

Zadanie jest **wieloplikowe**. Uzupełnij pliki w `src/`; testy importują
wyłącznie z `src/index.ts`. `src/types.ts` to gotowy kontrakt — nie
zmieniaj go. Całość działa na standardowych `Request`/`Response`, więc
testuje się bez socketów.

## `src/router.ts`

`matchRoute(routes, method, pathname)`:

- trafienie → `{ kind: "match", route }`;
- ścieżka istnieje pod innymi metodami → `{ kind: "method-mismatch",
  allow }` (posortowane, bez duplikatów);
- brak ścieżki → `{ kind: "not-found" }`.

## `src/idempotency.ts`

`createIdempotencyStore()` — pamięć odpowiedzi mutacji:

- `get(key)` → zapisany snapshot `{ status, body }` albo `undefined`;
- `remember(key, snapshot)` — zapamiętuje **kopię niezależną od wejścia**
  (późniejsza mutacja obiektu wywołującego nie może zmienić zapisu).

## `src/app.ts`

`createApp(options)` zwraca `handle(request: Request): Promise<Response>`:

- **Request ID**: nagłówek `x-request-id` żądania albo `options.generateId()`;
  każda odpowiedź (także błędy) ma nagłówek `x-request-id`;
- **Routing**: pathname przez `new URL`; `not-found` → 404, mismatch → 405
  z nagłówkiem `Allow`;
- **Body**: dla żądań z body czytaj tekst; rozmiar w bajtach ponad
  `options.maxBodyBytes` → 413; niepoprawny JSON → 400;
- **Idempotencja**: mutacja (POST) z nagłówkiem `idempotency-key`:
  powtórka klucza zwraca zapamiętaną odpowiedź **bez** wywołania handlera,
  z nagłówkiem `idempotent-replay: true`; nowa odpowiedź jest zapamiętywana;
- **Błędy**: handler rzucający `Error` o `name === "ValidationError"` → 400
  z jego komunikatem; wszystko inne → 500 z generycznym `"Internal Server
  Error"` — bez wycieku szczegółów; envelope błędu:
  `{ error, requestId }`;
- odpowiedzi sukcesu: `{ status, body }` handlera serializowane do JSON
  z `content-type: application/json`.

## `src/index.ts`

Gotowa publiczna granica: `createApp`, `matchRoute`,
`createIdempotencyStore` i typy.

## Kryteria akceptacji

- retry mutacji z tym samym kluczem nie wykonuje operacji drugi raz,
- 500 nigdy nie niesie komunikatu wewnętrznego wyjątku,
- wszystkie odpowiedzi mają requestId w nagłówku, a błędy także w body.
