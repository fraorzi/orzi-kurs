# Web Streams i kompresja

Node ma dwa API streamów. Klasyczne (`node:stream`) napędza ekosystem Node;
**Web Streams** (`ReadableStream`, `WritableStream`, `TransformStream`) to
standard WHATWG wspólny z przeglądarkami, `fetch` i Deno. Nowe API projektuje
się na Web Streams; z klasycznymi łączy je mostek `Readable.toWeb`/`fromWeb`.

## Reader i lock

`stream.getReader()` **blokuje** stream na wyłączność readera. Kontrakt:

- `read()` zwraca `{ done, value }` — pętla do `done === true`;
- gdy przerywasz konsumpcję (limit, błąd), wywołaj `reader.cancel(reason)` —
  to sygnał dla źródła, żeby przestało produkować;
- `releaseLock()` w `finally` — zablokowany stream nie da się użyć ponownie,
  a wiszący lock to klasyka błędów tego API.

`pipeThrough(new TransformStream({...}))` komponuje transformacje
deklaratywnie — z automatycznym backpressure, bez zdarzeń `drain`.

## Kompresja

`node:zlib` daje transformy `createGzip`/`createGunzip` (klasyczne) oraz —
wspólne z przeglądarką — `CompressionStream`/`DecompressionStream` (Web).
Kompresję wpina się jako ogniwo pipeline'u: dane płyną przez transform bez
buforowania całości w pamięci. Poprawność weryfikuje się roundtripem —
`gunzip(gzip(x)) === x` — a nie porównaniem bajtów skompresowanych, które
zależą od wersji zlib i poziomu kompresji.

## Kiedy używać

- API, które ma działać też w przeglądarce/na edge — Web Streams od początku.
- Konsumpcja `response.body` z `fetch` (to ReadableStream) z limitem rozmiaru.
- Kompresja/dekompresja plików i odpowiedzi w locie.

## Kiedy unikać

- Wewnątrz kodu opartego o klasyczne streamy nie przepinaj się na Web tam,
  gdzie nic z tego nie masz — mostkuj na granicy.
- Nie porównuj skompresowanych bajtów w testach; testuj roundtrip.
- Nie czytaj całych streamów do pamięci bez limitu (temat 08 wraca wszędzie).

## Pułapki

- Po `getReader()` stream jest `locked` — również dla `pipeThrough`; najpierw
  zwolnij lock.
- `cancel(reason)` na readerze, nie na streamie, kiedy lock jest aktywny.
- `Readable.toWeb` wymaga strumienia bajtów; obiekt push-stream z `objectMode`
  nie przejdzie.
- Chunki z `TransformStream` niosą to, co enqueue'ujesz — pilnuj typu
  (string vs Uint8Array), bo `pipeThrough` nie konwertuje.

## Źródła (audyt 2026-07-17, Node 24 LTS)

- [Web Streams API](https://nodejs.org/download/release/latest-v24.x/docs/api/webstreams.html)
- [Zlib](https://nodejs.org/download/release/latest-v24.x/docs/api/zlib.html)
- [MDN: Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)
