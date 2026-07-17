# Easy — zbierz ReadableStream z limitem

Czytasz `response.body` (Web ReadableStream) i nie ufasz rozmiarowi.
Zaimplementuj `solve(stream, maxBytes)`:

- czytaj przez `stream.getReader()` aż do `done`;
- licz bajty; po przekroczeniu `maxBytes` wywołaj `reader.cancel(...)`
  (sygnał dla źródła: przestań produkować) i rzuć `Error`;
- w happy path zwróć sklejone bajty jako jeden `Uint8Array`;
- lock readera zwolnij w `finally` — stream nie może zostać zablokowany
  po wyjściu z funkcji, niezależnie od ścieżki.
