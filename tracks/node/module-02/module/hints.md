## Hint 1

Zacznij od `matchRoute` — to router z tematu 08 przeniesiony na typ
`RouteMatch`; discriminated union zamiast statusów HTTP.

## Hint 2

`createIdempotencyStore` to `Map` plus kopiowanie snapshotu przy
`remember` (np. `structuredClone(snapshot.body)`) — test mutuje obiekt po
zapisaniu i sprawdza, że zapis się nie zmienił... a jeśli nie ten test, to
review; kopiuj defensywnie na granicy modułu.

## Hint 3

W `createApp` wydziel lokalny helper `respond(requestId, result, extra?)`
budujący `Response` z JSON-em i nagłówkiem `x-request-id` — każda ścieżka
(404, 405, 413, 400, 500, sukces, replay) przechodzi przez niego.

## Hint 4

Kolejność w handlerze: request id → routing → body (limit, JSON) →
idempotencja (replay przed handlerem, zapis po sukcesie) → try/catch na
wywołaniu handlera z mapowaniem ValidationError/reszta.
