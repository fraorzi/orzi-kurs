## Hint 1

- `capitalizeWords`: `\b\w` dopasowuje pierwszy znak każdego słowa. W `replace` z funkcją
  zwróć jego wersję wielką.
- `censor`: gdy wzorzec zależy od danych, buduj go przez `new RegExp(word, "gi")`
  (`g` = wszystkie, `i` = ignoruj wielkość). Zamiennik to `"*".repeat(word.length)`.

## Hint 2

```js
export function capitalizeWords(str) {
  return str.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function censor(text, word) {
  return text.replace(new RegExp(word, "gi"), "*".repeat(word.length));
}
```

`new RegExp(...)` to sposób na regex tworzony w locie z wartości — literał `/.../` wymaga
wzorca znanego już przy pisaniu kodu.
