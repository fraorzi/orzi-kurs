# Moduł 02 — Klient API z retry, timeoutem i kolejką

Drugi **projekt wieloplikowy**. Budujesz warstwę sieciową, jakiej używa realna
aplikacja: pojedyncze żądanie samo radzi sobie z chwilową awarią (retry), nie wisi
w nieskończoność (timeout), a wszystkie żądania płyną przez wspólną kolejkę, żeby nie
zalać serwera setką równoczesnych połączeń.

To synteza czterech zagadnień: **fetch + AbortController** (32), **async/await**
i **promisy** (10/11), **własne błędy** (16) oraz **limit współbieżności / pool** (37).

## Architektura

```
src/
├─ http.js    # requestJson + HttpError — jedno odporne żądanie (retry/timeout)
├─ queue.js   # createQueue(concurrency) — przepustnica równoczesnych zadań
└─ index.js   # createApiClient — skleja żądanie z kolejką (publiczne API)
```

Zależność jest jednokierunkowa: `index.js` importuje z `http.js` i `queue.js`, a te
dwa nic o sobie nie wiedzą. Dzięki temu każdą warstwę testujesz osobno, a złożenie
jest trywialne.

## Kluczowe idee

- **Rozdziel „ponawialne" od „beznadziejnych".** Kod 4xx to błąd żądania (zły adres,
  brak uprawnień) — ponawianie go tylko marnuje czas. Kod 5xx i błędy sieci bywają
  chwilowe, więc mają sens retry z **backoffem wykładniczym** (rosnące przerwy nie
  dobijają serwera, który się dławi).
- **Timeout to `AbortController`, nie wyścig.** Zamiast `Promise.race` z timerem
  (który zostawia wiszące żądanie) przerywasz je u źródła: `signal` trafia do fetcha,
  a `abort()` naprawdę je anuluje. Timer zawsze czyścisz w `finally`.
- **Współbieżność steruj jednym miejscem.** Kolejka z licznikiem `active` i funkcją
  `pump()` gwarantuje niezmiennik „najwyżej N naraz". `get` klienta nie wie nic
  o współbieżności — po prostu wrzuca zadanie do kolejki. Warstwy są ortogonalne:
  retry nie wie o kolejce, kolejka nie wie o retry.

## Kiedy używać / czego unikać

- **Używaj** wspólnego klienta z kolejką, gdy odpalasz wiele żądań naraz (listy,
  dashboardy, prefetch) — inaczej przeglądarka i serwer i tak je zserializują, ale
  bez kontroli i z gorszymi błędami.
- **Nie ponawiaj** operacji, które nie są idempotentne (np. `POST` tworzący zasób),
  chyba że masz klucz idempotencji — inaczej retry zdubluje efekt.
- **Nie ustawiaj** zbyt agresywnego retry bez backoffu i limitu prób — to prosta droga
  do „retry storm", który dobija już przeciążony serwis.
