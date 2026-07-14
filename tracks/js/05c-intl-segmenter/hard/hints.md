## Hint 1

Zbuduj dwa segmentery raz, na początku funkcji: jeden `"word"`, jeden `"sentence"`. Z
segmentera słów wyciągnij tablicę słów (`isWordLike`, `.map((s) => s.segment)`) — przyda się
do trzech pól naraz.

## Hint 2

- `uniqueWords`: `new Set(words.map((w) => w.toLowerCase())).size` — Set zliczy różne słowa,
  `toLowerCase` scala `"The"` z `"the"`.
- `sentences`: jak w medium — segmenty zdań, `.trim()`, odfiltruj puste, weź `.length`.

## Hint 3

`longestWord` pętlą z ostrym porównaniem, żeby przy remisie zostało pierwsze słowo:

```js
let longestWord = "";
for (const word of words) {
  if (word.length > longestWord.length) longestWord = word;
}
```

Dla pustego tekstu `words` jest puste, więc naturalnie wychodzi
`{ words: 0, sentences: 0, uniqueWords: 0, longestWord: "" }`.
