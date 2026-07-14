# Easy — liczenie słów świadome lokalizacji

Użyj `Intl.Segmenter` z `granularity: "word"`. Segment słowa ma `isWordLike === true`;
spacje i interpunkcja mają `false`.

## 1. `countWords(text, locale)`

Zwraca liczbę słów w tekście (segmenty `isWordLike`).

```js
countWords("Ala ma kota, tak?", "pl"); // 4  (Ala, ma, kota, tak)
countWords("It's 3 cats!", "en");      // 3  (It's, 3, cats)
countWords("   ", "en");               // 0
```

## 2. `wordList(text, locale)`

Zwraca tablicę samych słów (tekst segmentów `isWordLike`), w kolejności wystąpienia.

```js
wordList("  hello   world  ", "en"); // ["hello", "world"]
```

Zbuduj `new Intl.Segmenter(locale, { granularity: "word" })`, zrób `[...seg.segment(text)]`
i odfiltruj po `isWordLike`.
