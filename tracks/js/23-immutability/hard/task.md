# Hard - deepFreeze (rekurencyjne zamrożenie)

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

`Object.freeze` jest **płytki** - zagnieżdżone obiekty pozostają zmienne. Zaimplementuj
`deepFreeze(obj)`, które zamraża obiekt **i wszystkie** zagnieżdżone obiekty oraz tablice,
w dowolnej głębokości. Zwróć zamrożony obiekt (ten sam, zamrożony „w miejscu").

## Wymagania

- `obj` i każdy zagnieżdżony obiekt/tablica są zamrożone (`Object.isFrozen` → `true`),
- w trybie strict (moduł ES) zapis na dowolnym poziomie rzuca `TypeError`,
- `push` na zamrożonej tablicy rzuca,
- działa dla struktur z cyklami (nie zapętla się w nieskończoność).

```js
const config = deepFreeze({
  api: { url: "x", retries: [1, 2, 3] },
});

Object.isFrozen(config.api);         // true
Object.isFrozen(config.api.retries); // true
config.api.url = "y";     // TypeError (strict)
config.api.retries.push(4); // TypeError (strict)
```
