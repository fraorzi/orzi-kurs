# Medium [D] — forEach+async i map obietnic

Dwie funkcje „prawie działają", ale gubią asynchroniczność. Napraw je.

## 1. `processAll(items, asyncFn)`

Ma zwrócić tablicę wyników `asyncFn` dla każdego elementu, po kolei.

```js
await processAll([1, 2, 3], async (x) => x * 2); // [2, 4, 6]
```

Obecnie zwraca pustą tablicę — użyto `forEach(async ...)`, które **nie czeka** na
obietnice callbacków.

## 2. `mapAsync(items, asyncFn)`

Ma zwrócić tablicę **wartości** (nie obietnic) z `asyncFn` dla każdego elementu.

```js
await mapAsync([1, 2, 3], async (x) => x * 2); // [2, 4, 6]
```

Obecnie rozwiązuje się do tablicy obietnic — brakuje „zebrania" ich w jedną obietnicę.
