# Easy — wstrzyknij granicę czasu

Cache z TTL ma być testowalny bez sleepów i fake timers. Zaimplementuj
`solve(ttlMs, load, now)`:

- zwróć funkcję `get()`, która przy pierwszym wywołaniu liczy wartość przez
  `load()` i zapamiętuje ją z terminem ważności `now() + ttlMs`;
- dopóki `now() < expiresAt`, zwracaj wartość z cache bez wołania `load`;
- od momentu `now() >= expiresAt` (równość włącznie) przeładuj wartość
  i ustaw nowy termin;
- czas płynie wyłącznie przez wstrzyknięte `now` — w rozwiązaniu nie ma
  `Date.now`.
