# Easy — lookbehind

Lookbehind sprawdza, co jest **przed** dopasowaniem, nie włączając tego do wyniku.

## 1. `extractPrices(text)`

Zwraca tablicę **liczb** występujących bezpośrednio po znaku `$` (całkowitych lub z częścią
dziesiętną). Sam `$` nie wchodzi do wyniku. Liczby bez `$` pomijasz.

```js
extractPrices("buy $30 or $9.99, not 50"); // [30, 9.99]
extractPrices("brak cen");                  // []
```

Rozwiąż zadanie pozytywnym lookbehindem i dopasowaniem globalnym.

## 2. `extractMentions(text)`

Zwraca tablicę nazw użytkowników po znaku `@` (znaki `\w`), bez `@`.

```js
extractMentions("hi @ala and @ola_99!"); // ["ala", "ola_99"]
```

Także tutaj użyj pozytywnego lookbehindu i dopasowania globalnego.
