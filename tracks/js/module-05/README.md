# Moduł 05 — Harmonogram zadań: pool, retry, batching

Piąty **projekt wieloplikowy** i domknięcie tracku JS. Budujesz warstwę sterującą
przepustowością — dokładnie to, czego potrzebujesz, gdy front albo skrypt zaczyna
zasypywać API setką żądań naraz. Trzy niezależne mechanizmy, jedno złożenie:
**pool** ogranicza równoczesność, **retry** amortyzuje chwilowe awarie, **batcher**
zbija wiele drobnych żądań w jedno.

To synteza czterech zagadnień: **limit współbieżności / pool** (37), **promisy** (10),
**retry z backoffem** (32) oraz **dławienie tempa** w duchu throttle (25) — tu jako
grupowanie zamiast czekania na zegar.

## Architektura

```
src/
├─ pool.js    # createPool(concurrency) — najwyżej N zadań naraz
├─ retry.js   # withRetry(task, opts) — ponawianie z backoffem wykładniczym
├─ batch.js   # createBatcher(batchFn) — wiele load() → jedno batchFn(keys)
└─ index.js   # createScheduler — pool + retry złożone w harmonogram
```

Trzy dolne pliki nic o sobie nie wiedzą — każdy testujesz osobno. `index.js` zagnieżdża
retry wewnątrz poolu; batcher zostaje samodzielnym narzędziem, bo działa na innej osi
(łączy żądania, nie ogranicza ich liczby).

## Kluczowe idee

- **Współbieżność to najprostszy rate limit.** Zamiast liczyć „ile na sekundę" (co
  wymaga zegara i bywa nieszczelne) pool pilnuje niezmiennika „ile naraz". `maxActive`
  pozwala to zmierzyć deterministycznie — bez pomiaru czasu, więc bez flaky testów.
- **Retry ma sens tylko z backoffem.** Natychmiastowe ponawianie dobija serwis, który
  już się dławi. Rosnące przerwy (`backoffMs * 2 ** n`) dają mu odetchnąć. Retry owinięty
  **wewnątrz** slotu poolu nie „przecieka" dodatkową współbieżnością.
- **Batching zamienia N żądań w jedno.** Wzorzec z DataLoadera: `load(key)` nie strzela
  od razu, tylko dokłada klucz do kolejki; `flush` (ręczny albo po `maxSize`) woła
  `batchFn` raz i rozdaje wyniki po indeksie. To zabija problem N+1 u źródła.

## Kiedy używać / czego unikać

- **Używaj** poolu zawsze, gdy odpalasz zmienną, potencjalnie dużą liczbę zadań
  (mapowanie po liście, migracja, scraping) — bez limitu wysycisz połączenia i pamięć.
- **Batchuj** żądania o wspólnym kształcie (pobierz userów po id), gdy backend ma
  endpoint zbiorczy. Nie batchuj rzeczy niezależnych czasowo — zebrany klient czeka na
  najwolniejszego z partii.
- **Nie ponawiaj** operacji nieidempotentnych bez zabezpieczenia (klucz idempotencji),
  a retry zawsze ograniczaj liczbą prób i backoffem — inaczej zamiast odporności masz
  „retry storm".

## Pułapki

- Slot poola nie może zostać zajęty na zawsze po odrzuceniu zadania.
- Retry wewnątrz poola zachowuje limit; retry uruchamiane obok poola może go ominąć.
- Batcher musi rozdzielić wyniki do właściwych oczekujących Promise i obsłużyć błąd partii.
- `maxSize` bez automatycznego lub ręcznego flush może pozostawić zadania w kolejce.
