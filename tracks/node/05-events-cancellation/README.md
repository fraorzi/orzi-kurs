# Zdarzenia i anulowanie

`EventEmitter` to podstawowy kontrakt obserwacji w Node — na nim stoją streamy,
serwery HTTP, procesy potomne. Ma trzy ostre krawędzie, które trzeba znać:

- **`error` jest specjalne**: emisja `error` bez listenera rzuca wyjątek
  i domyślnie **ubija proces**. Każdy długo żyjący emitter potrzebuje handlera
  `error` od chwili powstania.
- **Listenery to zasoby**: `on()` bez późniejszego `off()` to wyciek — obiekt
  utrzymywany przez emitter nigdy nie zostanie zebrany, a po 10 subskrypcjach
  Node ostrzega o możliwym wycieku (`MaxListenersExceededWarning`).
- **Subskrypcja powinna zwracać cleanup**: wzorzec `const off = subscribe(...)`
  z idempotentnym `off()` (wielokrotne wywołanie bezpieczne) eliminuje całą
  klasę bugów podwójnego sprzątania.

## Anulowanie przez AbortSignal

`AbortSignal` to standardowy sposób propagowania anulowania przez warstwy.
Pomocnik `events.once(emitter, event, { signal })` czeka na jedno zdarzenie:

- rozwiązuje się tablicą argumentów pierwszej emisji,
- abort odrzuca promise (`AbortError`) i **sam zdejmuje listener** — bez
  ręcznego sprzątania nie zostaje wiszący handler,
- sygnał już przerwany odrzuca natychmiast.

Ta sama konwencja (`{ signal }`) działa w `fetch`, streamach, timerach
z `timers/promises` — jeden mechanizm anulowania od HTTP po system plików.

## Kiedy używać

- Mosty zdarzenie → promise (`czekaj na "ready", ale nie dłużej niż timeout`).
- Publiczne API modułu: subskrypcja zwracająca funkcję cleanup.
- Fabryki emitterów w usługach — z obowiązkowym handlerem `error`.

## Kiedy unikać

- Do jednorazowej komunikacji między dwiema funkcjami wystarczy promise.
- Nie buduj na emitterze przepływów żądanie-odpowiedź z korelacją — to temat
  o workerach (11).
- Nie podnoś `setMaxListeners` zamiast naprawić wyciek.

## Pułapki

- `emitter.once()` a `events.once()` to różne rzeczy: metoda podpina callback,
  funkcja z `node:events` zwraca promise.
- Cleanup musi być idempotentny — drugi `off()` tego samego listenera nie może
  zdjąć cudzej subskrypcji ani rzucić.
- Handler `error` w kanale współdzielonym loguje **komunikat**, nie cały obiekt
  błędu — pola błędów potrafią nieść sekrety (nagłówki, konfiguracja).

## Źródła (audyt 2026-07-17, Node 24 LTS)

- [Events](https://nodejs.org/download/release/latest-v24.x/docs/api/events.html)
- [AbortSignal (globals)](https://nodejs.org/download/release/latest-v24.x/docs/api/globals.html#class-abortsignal)
