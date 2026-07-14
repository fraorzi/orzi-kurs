# Easy — pierwszy async generator

## 1. `asyncRange(start, end)`

Napisz **async generator** (`async function*`) zwracający kolejno liczby od `start` do
`end - 1`.

```js
for await (const n of asyncRange(1, 4)) console.log(n); // 1, 2, 3
asyncRange(5, 5); // nic nie wyprodukuje
```

## 2. `collect(asyncIterable)`

Zbierz wszystkie wartości async iterable do zwykłej tablicy, używając `for await...of`.
Zwróć `Promise<Array>`.

```js
await collect(asyncRange(1, 4)); // [1, 2, 3]
```

`collect` ma działać na dowolnym async iterable, nie tylko na `asyncRange`.
