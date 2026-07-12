## Hint 1

`getPath`: `path.split(".")` i pętla — na każdym kroku sprawdź, czy bieżąca
wartość jest `null`/`undefined`, zanim wejdziesz głębiej. Na końcu porównaj
wynik z `undefined` (nie truthiness!). `mapValues`: entries → map → fromEntries.
`groupBy`: pętla z dopisywaniem do `result[key]`, inicjalizując tablicę przy
pierwszym elemencie grupy.

## Hint 2

```js
let current = obj;
for (const key of path.split(".")) {
  if (current === null || current === undefined) return fallback;
  current = current[key];
}
return current === undefined ? fallback : current;
```

`groupBy`: przy pierwszym elemencie grupy zainicjalizuj tablicę:

```js
if (!result[key]) result[key] = [];
result[key].push(item);
```
