# Easy - truthy, falsy i typeof w praktyce

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Zaimplementuj w `starter.js` trzy funkcje.

## 1. `compact(arr)`

Zwraca **nową** tablicę bez wartości falsy (jak `_.compact` z lodasha).

```js
compact([0, 1, false, 2, "", 3, null, undefined, NaN]); // [1, 2, 3]
compact(["a", " ", []]); // ["a", " ", []] - " " i [] są truthy!
```

## 2. `typeOf(value)`

Jak `typeof`, ale naprawia historyczny błąd: dla `null` zwraca `"null"`.

```js
typeOf(42);   // "number"
typeOf(null); // "null" - a nie "object"
typeOf({});   // "object"
```

## 3. `isNumericString(s)`

Czy `s` jest stringiem, który po przycięciu białych znaków reprezentuje
skończoną liczbę? Uwaga na pułapkę `Number("") === 0`.

```js
isNumericString("12");    // true
isNumericString("  12 "); // true
isNumericString("-3.5");  // true
isNumericString("");      // false - pusty string to NIE liczba
isNumericString("12px");  // false
isNumericString(12);      // false - nie jest stringiem
```
