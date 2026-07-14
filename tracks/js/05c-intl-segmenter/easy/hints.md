## Hint 1

`new Intl.Segmenter(locale, { granularity: "word" })` daje segmenter słów. Iteracja po
`seg.segment(text)` zwraca obiekty `{ segment, index, input, isWordLike }`. Słowa to te
z `isWordLike === true` — spacje i interpunkcja mają `false`.

## Hint 2

Zbierz segmenty do tablicy przez spread i przefiltruj:

```js
const seg = new Intl.Segmenter(locale, { granularity: "word" });
const words = [...seg.segment(text)].filter((s) => s.isWordLike);
```

`countWords` zwraca `words.length`; `wordList` zwraca `words.map((s) => s.segment)`.
