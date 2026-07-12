# Medium — replace z funkcją i regex budowany z danych

## 1. `capitalizeWords(str)`

Zmień pierwszą literę **każdego słowa** na wielką, resztę zostaw. Użyj `replace` z funkcją
i granicy słowa `\b`.

```js
capitalizeWords("hello world");     // "Hello World"
capitalizeWords("jan kowalski xy"); // "Jan Kowalski Xy"
```

## 2. `censor(text, word)`

Zamień **wszystkie** wystąpienia `word` (niezależnie od wielkości liter) na gwiazdki
(`*`) w liczbie równej długości słowa. Zbuduj wzorzec **z danych** przez
`new RegExp(word, "gi")` (przydatne, gdy wzorzec nie jest znany z góry).

```js
censor("Hello hello HELLO world", "hello"); // "***** ***** ***** world"
censor("abcabc", "bc");                     // "a**a**"
```

(Zakładamy, że `word` składa się ze zwykłych znaków — bez metaznaków regexa.)
