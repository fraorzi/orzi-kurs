# Obserwowalność

Usługi nie debuguje się debuggerem na produkcji — diagnozuje się ją po
sygnałach, które sama wysyła. Trzy fundamenty:

**Structured logging.** Log to dane, nie proza: jeden JSON na linię (NDJSON),
ze stałymi polami `timestamp`, `level`, `message`, `requestId`. Taki format
filtruje się i agreguje w systemach logów bez regexów. Dyscyplina pól:
`undefined` znika (nie zamienia się w `"undefined"`), sekrety są redagowane
po nazwie klucza, a zegar jest wstrzykiwany — logger bez `new Date()`
w środku testuje się deterministycznie.

**Event loop delay.** Najważniejsza metryka zdrowia procesu Node: o ile
później niż planowo wykonują się zadania pętli. `perf_hooks.monitorEventLoopDelay`
daje histogram w **nanosekundach** — raportowanie wymaga normalizacji do ms
i progu (np. degraded przy p99 > budżet). Wysoki delay = coś blokuje wątek —
synchroniczna praca, za duże JSON.parse, brak yieldów (temat 06).

**diagnostics_channel.** Wbudowana, tania magistrala telemetryczna: moduł
publikuje zdarzenia na nazwanym kanale, a subskrybenci (APM, testy) podpinają
się bez zmian w module. Kluczowa własność: `channel.hasSubscribers` pozwala
**nie liczyć** kosztownego payloadu, gdy nikt nie słucha — telemetria bez
podatku od nieużywania.

## Kiedy używać

- Structured logi od pierwszego dnia usługi; korelacja przez requestId
  z AsyncLocalStorage (temat 06).
- Monitoring event loop delay w każdej usłudze wystawionej na ruch.
- diagnostics_channel do własnych zdarzeń bibliotecznych zamiast wstrzykiwania
  loggera przez wszystkie warstwy.

## Kiedy unikać

- Nie loguj obiektów o nieograniczonej głębokości/rozmiarze — log to też
  wektor DoS (temat 16).
- Nie licz payloadów telemetrii, gdy `hasSubscribers` jest false.
- Nie mieszaj logów ludzkich (`console.log("startuję...")`) ze strumieniem
  NDJSON — psuje parsery.

## Pułapki

- `JSON.stringify` gubi pola `undefined` w obiektach — ale zamienia je na
  `null` w tablicach; czyść pola przed serializacją.
- Histogram delay liczy w ns; mylenie jednostek daje absurdalne dashboardy —
  konwersja i zaokrąglenie należą do warstwy raportowania.
- Kanał `diagnostics_channel` identyfikuje nazwa — literówka tworzy nowy,
  pusty kanał bez błędu.
- Publikowany obiekt trafia do subskrybentów przez referencję — nie mutuj go
  po publish.

## Źródła (audyt 2026-07-17, Node 24 LTS)

- [monitorEventLoopDelay](https://nodejs.org/download/release/latest-v24.x/docs/api/perf_hooks.html#perf_hooksmonitoreventloopdelayoptions)
- [Diagnostics Channel](https://nodejs.org/download/release/latest-v24.x/docs/api/diagnostics_channel.html)
