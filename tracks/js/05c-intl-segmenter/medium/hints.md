## Hint 1

Segmenter zdań: `new Intl.Segmenter(locale, { granularity: "sentence" })`. Każdy segment ma
końcowe spacje — przytnij `.trim()` i odrzuć puste (`s.length > 0`), zanim je zwrócisz.

## Hint 2

```js
export function splitSentences(text, locale) {
  const seg = new Intl.Segmenter(locale, { granularity: "sentence" });
  return [...seg.segment(text)].map((s) => s.segment.trim()).filter((s) => s.length > 0);
}
```

## Hint 3

`longestSentence`: przejdź po zdaniach z `splitSentences`, dla każdego policz słowa
segmenterem `"word"` (`isWordLike`) i zapamiętaj to z największą liczbą słów. Porównanie
`n > bestWords` (ostre `>`) zapewnia, że przy remisie wygrywa **pierwsze** zdanie.
