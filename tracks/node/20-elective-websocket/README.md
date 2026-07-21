# Elective: klient WebSocket

**To elective** — najpierw ukończ rdzeń tracka (01–18). Node ma stabilnego,
wbudowanego klienta `WebSocket` (globalne API zgodne z przeglądarką).
Zadania uczą trzech warstw odpornego klienta — czystych funkcji, które
testuje się bez otwierania połączeń:

**Walidacja endpointu.** Adres i subprotokoły przychodzą z konfiguracji:
schemat tylko `ws:`/`wss:` (w produkcji wyłącznie `wss:` — TLS nie jest
opcją), credentials w URL zabronione (lądują w logach), subprotokoły
z allow-listy i bez duplikatów.

**Reconnect z backoffem.** Zerwane połączenie wraca przez *exponential
backoff z pełnym jitterem*: `delay = random() * min(cap, base * 2^attempt)`.
Jitter jest pełny (mnoży całość, nie dodaje szczyptę), bo bez niego wszyscy
klienci wracają w tej samej sekundzie i kładą serwer drugi raz (thundering
herd). RNG jest wstrzykiwany — test podaje wartości, wynik jest
deterministyczny.

**Kolejka wysyłki z limitem.** Między zerwaniem a ponownym OPEN aplikacja
dalej chce wysyłać. Kolejka buforuje z twardym limitem **bajtów** (nie
liczby wiadomości), opróżnia się FIFO po otwarciu, a `close()` czyści stan
i odrzuca dalsze `enqueue` — wieczne buforowanie do martwego socketa to
wyciek pamięci.

## Kiedy używać

- Klienci długo żyjących połączeń: notyfikacje, streamy zdarzeń, IoT.
- Każdy reconnect — backoff z jitterem to wzorzec obowiązkowy, nie opcja.
- Bufory wysyłki wszędzie tam, gdzie połączenie bywa chwilowo martwe.

## Kiedy unikać

- Do zwykłego request/response wystarczy HTTP — WebSocket to koszt
  utrzymania stanu połączenia.
- Nie buforuj bez limitu i nie retry'uj bez capa — obie "wygody" to awarie
  odroczone w czasie.
- Nie wpinaj sekretów w URL (`wss://user:pass@host`) — od tego są nagłówki
  albo ticket w pierwszej wiadomości.

## Pułapki

- `2 ** attempt` rośnie szybko — bez `min(cap, ...)` po 30 próbach czekasz
  lata; cap jest częścią wzoru, nie ozdobą.
- Pełny jitter zwraca też wartości bliskie zeru — to celowe, rozprasza
  stado; `random()` spoza `[0, 1)` to błąd kontraktu RNG.
- Limit kolejki licz w bajtach (`Buffer.byteLength`) — sto wiadomości po
  1 MB to nie to samo co sto po 100 B.
- Po `close()` kolejka musi być pusta, a `queuedBytes()` zerowe — inaczej
  metryki kłamią.

## Źródła (audyt 2026-07-17, Node 24 LTS)

- [WebSocket (globals)](https://nodejs.org/download/release/latest-v24.x/docs/api/globals.html#websocket)
- [AWS Architecture Blog: Exponential Backoff and Jitter](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/)
