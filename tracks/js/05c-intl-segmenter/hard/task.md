# Hard — analiza tekstu (słowa + zdania)

Zaimplementuj `analyze(text, locale)` zwracające podsumowanie tekstu. Łączysz dwie
granularności segmentera (`"word"` i `"sentence"`).

```js
analyze("The cat sat. The cat ran fast.", "en");
// { words: 7, sentences: 2, uniqueWords: 5, longestWord: "fast" }
```

Zwróć obiekt o polach:

- `words` — liczba słów (segmenty `isWordLike`).
- `sentences` — liczba zdań (przyciętych, niepustych).
- `uniqueWords` — liczba **różnych** słów, **bez rozróżniania wielkości liter**
  (`"The"` i `"the"` to jedno słowo).
- `longestWord` — najdłuższe słowo (po `length`); przy remisie **pierwsze** w kolejności
  wystąpienia. Zwracaj oryginalną pisownię.

Dla pustego tekstu zwróć `{ words: 0, sentences: 0, uniqueWords: 0, longestWord: "" }`.

Wskazówka wydajności: **nie twórz** nowego `Intl.Segmenter` w pętli — zbuduj po jednym
segmenterze na granularność i użyj ich raz.
