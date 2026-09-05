# Medium - sumowanie wartości mieszanych typów

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Zaimplementuj `sumMixed(values)` - sumuje tablicę wartości, gdzie element może być:

- `bigint` (np. `10n`),
- całkowity `number` (np. `5`),
- string z liczbą całkowitą (np. `"3"`).

Zwróć sumę jako **BigInt**. Kluczowa lekcja: **nie wolno** mieszać `bigint` z `number` w
działaniu (`10n + 5` rzuca `TypeError`) - najpierw skonwertuj każdy element przez `BigInt(...)`.

```js
sumMixed([10n, 5, "3"]);        // 18n
sumMixed([]);                   // 0n
sumMixed(["9007199254740993", 1n]); // 9007199254740994n (dokładnie)
```

Jeśli element to `number`, który **nie jest całkowity** (np. `1.5`), rzuć `TypeError`
z komunikatem tłumaczącym, że nie da się go bezpiecznie skonwertować na BigInt (BigInt
przyjmuje tylko całkowite).

```js
sumMixed([1.5]); // TypeError
```
