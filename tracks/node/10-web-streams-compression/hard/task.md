# Hard — kompresuj przez pipeline

Eksport danych ma być kompresowany w locie, bez buforowania całości.
Zaimplementuj `solve(input)`:

- źródłem jest `AsyncIterable<Uint8Array>` (np. generator rekordów);
- zepnij `Readable.from(input)` → `createGzip()` → ujście zbierające chunki,
  używając `pipeline` z `node:stream/promises`;
- zwróć skompresowany `Buffer`;
- błąd źródła ma odrzucić całość (pipeline propaguje błędy i sprząta ogniwa).

Poprawność sprawdza roundtrip (`gunzipSync`), nie bajty gzipa — te zależą
od wersji zlib.
