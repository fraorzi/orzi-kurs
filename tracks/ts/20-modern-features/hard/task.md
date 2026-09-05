# Hard - przenośny DisposableStack

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Zaimplementuj `createDisposableStack()`. Jeśli runtime ma globalny konstruktor
`DisposableStack`, użyj go. W przeciwnym razie zwróć zgodny fallback.

Fallback ma obsługiwać:

- `use`, `adopt` i `defer`,
- zwalnianie w odwrotnej kolejności,
- idempotentne `dispose` i `[Symbol.dispose]`,
- `disposed`,
- `move()` przenoszące callbacki i unieważniające źródłowy stos,
- `ReferenceError` przy dodawaniu do unieważnionego stosu,
- wykonanie pozostałych cleanupów nawet wtedy, gdy jeden z nich rzuci.

Zaimplementuj dokładnie kontrakt `DisposableStack`, bez `any`. To fallback runtime,
nie własna konkurencyjna abstrakcja domenowa.
