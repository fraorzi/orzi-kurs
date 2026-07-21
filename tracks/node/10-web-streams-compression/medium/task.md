# Medium — połącz streamy Node i Web

Legacy moduł daje klasyczny `Readable`, nowe API mówi Web Streams.
Zaimplementuj `solve(source)`:

- zmostkuj `Readable.toWeb(source)` do `ReadableStream`;
- przepuść przez `TransformStream`, który dekoduje chunki i wypuszcza tekst
  uppercase;
- skonsumuj wynik readerem i zwróć sklejony string.

Mostek jest jednokierunkowy i lokalny — reszta systemu nie musi wiedzieć,
że źródłem był klasyczny stream.
