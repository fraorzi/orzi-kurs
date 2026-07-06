## Hint 1

Trzy linie — po jednej na każdą kolejkę: bezpośrednie wywołanie (sync),
`queueMicrotask(...)` (mikro), `setTimeout(...)` (makro).

## Hint 2

```js
log("sync");
queueMicrotask(() => log("micro"));
setTimeout(() => log("macro"));
```

Kolejność zapisu w kodzie nie ma znaczenia — silnik i tak wykona sync → mikro → makro.
Sprawdź w README „Dwie kolejki", jeśli nie wiesz dlaczego.
