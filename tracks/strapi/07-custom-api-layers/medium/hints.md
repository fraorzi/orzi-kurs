## Hint 1

Dwa `await` po kolei: najpierw `deps.service(...)` zapisany do zmiennej,
potem `deps.sanitize(tejZmiennej)` — nie przypisuj `ctx.body` między nimi.

## Hint 2

`ctx.params.documentId` i `ctx.state.user.id` w tej kolejności jako
argumenty `service` — sygnatura `Deps["service"]` mówi dokładnie, czego
oczekuje.

## Hint 3

`ctx.body` dostaje wynik **drugiego** wywołania, nie pierwszego —
jeśli test HTTP widzi `secret` w odpowiedzi, przypisanie poszło za
wcześnie.
