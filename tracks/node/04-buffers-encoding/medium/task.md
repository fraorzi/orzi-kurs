# Medium - dekoduj podzielone chunki

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Czytasz tekst UTF-8 ze streamu, w którym granice chunków są przypadkowe -
wielobajtowy znak bywa przecięty w połowie. Zaimplementuj
`solve(chunks)`:

- połącz `AsyncIterable<Uint8Array>` w jeden string przez `StringDecoder`
  z `node:string_decoder`;
- znak przecięty między chunkami ma zostać zdekodowany poprawnie - bez znaku
  zastępczego U+FFFD;
- po pętli wywołaj `decoder.end()` i doklej wynik;
- puste wejście daje pusty string.
