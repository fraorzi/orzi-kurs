# Medium — transformacje obiektów

Zaimplementuj w `starter.js` trzy funkcje. Żadna nie może mutować wejścia.

## 1. `multiplyNumeric(obj)`

Nowy obiekt: wartości typu `number` pomnożone ×2, pozostałe bez zmian
(wariacja zadania z javascript.info — tam mutowało, u nas kopiuje).

```js
multiplyNumeric({ width: 200, height: 300, title: "Menu" });
// { width: 400, height: 600, title: "Menu" }
```

## 2. `pick(obj, keys)`

Nowy obiekt tylko z kluczami z `keys` (jak `_.pick` z lodasha). Klucze
nieobecne w `obj` są pomijane.

```js
pick({ a: 1, b: 2, c: 3 }, ["a", "c"]); // { a: 1, c: 3 }
pick({ a: 1 }, ["a", "zzz"]);            // { a: 1 }
```

## 3. `invert(obj)`

Nowy obiekt z zamienionymi kluczami i wartościami (jak `_.invert`).

```js
invert({ a: "1", b: "2" }); // { "1": "a", "2": "b" }
```
