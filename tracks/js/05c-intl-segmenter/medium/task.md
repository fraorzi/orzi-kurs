# Medium - dzielenie na zdania

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Użyj `Intl.Segmenter` z `granularity: "sentence"`. **Uwaga:** segment zdania zawiera
końcowe białe znaki (np. `"Ala ma. "`), więc rób `.trim()` i pomijaj puste.

## 1. `splitSentences(text, locale)`

Zwraca tablicę zdań (przycięte, bez pustych).

```js
splitSentences("Hello world. How are you? I'm fine!", "en");
// ["Hello world.", "How are you?", "I'm fine!"]

splitSentences("   ", "en"); // []
```

## 2. `longestSentence(text, locale)`

Zwraca najdłuższe zdanie (przycięte) - mierzone **liczbą słów**, nie znaków. Do liczenia
słów użyj granularności `"word"` i `isWordLike`. Przy remisie zwróć **pierwsze** takie zdanie.

```js
longestSentence("Short one. This sentence has clearly more words than the other!", "en");
// "This sentence has clearly more words than the other!"
```

Gdy tekst nie ma żadnego zdania, zwróć `""`.
