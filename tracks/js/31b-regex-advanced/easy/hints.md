## Hint 1

Pozytywny lookbehind `(?<=X)` wymaga, by przed dopasowaniem był `X`, ale `X` nie wchodzi do
wyniku. `$` w regex jest metaznakiem — escapuj go: `(?<=\$)`.

## Hint 2

`matchAll` z flagą `g` zwraca iterator wszystkich dopasowań; spread do tablicy i zmapuj:

```js
export function extractPrices(text) {
  return [...text.matchAll(/(?<=\$)\d+(?:\.\d+)?/g)].map((m) => Number(m[0]));
}

export function extractMentions(text) {
  return [...text.matchAll(/(?<=@)\w+/g)].map((m) => m[0]);
}
```

`\d+(?:\.\d+)?` to liczba całkowita z opcjonalną częścią po kropce (grupa nieprzechwytująca
`(?:...)`, bo nie potrzebujemy jej osobno). `Number(m[0])` zamienia dopasowany string na liczbę.
