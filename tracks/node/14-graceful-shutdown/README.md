# Graceful shutdown

Proces produkcyjny dostaje `SIGTERM` (deploy, skalowanie, OOM-killer ma
`SIGKILL` — tego nie obsłużysz) i ma skończone sekundy na porządne zamknięcie:
przestać przyjmować nową pracę, dokończyć bieżącą, zamknąć zasoby, wyjść.
Trzy elementy tego kontraktu:

**Idempotencja.** `SIGTERM` i `SIGINT` mogą przyjść wielokrotnie, health-check
może równolegle zawołać shutdown. Wzorzec: pierwszy caller uruchamia sprzątanie
i zapamiętuje **wspólny promise**; kolejni dostają ten sam promise. Cleanupy
wykonują się dokładnie raz, a `Promise.allSettled` gwarantuje, że awaria
jednego nie pominie pozostałych.

**Drenowanie pracy.** Zanim zamkniesz pule i połączenia, poczekaj aż aktywne
żądania się skończą. Licznik `enter()/leave()` z idempotentnym `leave`
i `drain()` czekającym na zero — plus `AbortSignal`, bo czekanie też musi być
przerywalne.

**Deadline i eskalacja.** Sprzątanie może zawisnąć (broken pipe, martwa baza).
Po przekroczeniu deadline'u wywołujesz `force()` (twarde zamknięcie) — ale
timer deadline'u musi być `unref()`, żeby sam nie podtrzymywał procesu,
który właśnie próbuje umrzeć.

## Kiedy używać

- Każda usługa HTTP/kolejkowa — kontrakt SIGTERM to standard platformy
  (Kubernetes, systemd, PaaS).
- Narzędzia CLI trzymające locki i pliki tymczasowe (SIGINT = Ctrl+C).

## Kiedy unikać

- Nie przeciągaj shutdownu w nieskończoność "aż wszystko się skończy" —
  orkiestrator i tak przyśle SIGKILL; deadline jest częścią projektu.
- Nie zamykaj zasobów w kolejności przypadkowej: najpierw stop przyjmowania,
  potem dren, na końcu zasoby.
- Nie myl `process.exit()` w środku sprzątania z eskalacją — ucina wszystko
  natychmiast, także zapisy w toku.

## Pułapki

- Drugi `SIGTERM` nie może wystartować sprzątania od nowa — stąd wspólny
  promise, nie boolean.
- `leave()` wywołane dwa razy nie może zdekrementować licznika dwukrotnie —
  idempotencja przez flagę w domknięciu.
- Timer deadline'u bez `unref()` utrzymuje event loop przy życiu — proces
  "nie chce umrzeć" przez własny watchdog.
- `Promise.race([cleanup, timeout])` zostawia przegrany promise żywym —
  posprzątaj timer po rozstrzygnięciu.

## Źródła (audyt 2026-07-17, Node 24 LTS)

- [Process signal events](https://nodejs.org/download/release/latest-v24.x/docs/api/process.html#signal-events)
- [timeout.unref()](https://nodejs.org/download/release/latest-v24.x/docs/api/timers.html#timeoutunref)
