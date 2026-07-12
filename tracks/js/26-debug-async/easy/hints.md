## Hint 1

Obie funkcje wywołują funkcję async, ale nie czekają na wynik. `fetchUser()` i `fetchB()`
zwracają **obietnice** — trzeba je poprzedzić `await`.

## Hint 2

- `loadName`: `const user = await fetchUser();` — teraz `user` to obiekt, `user.name` działa.
- `loadTotal`: `const b = await fetchB();` — bez tego dodajesz liczbę do obietnicy
  (`2 + Promise` → string „2[object Promise]").
