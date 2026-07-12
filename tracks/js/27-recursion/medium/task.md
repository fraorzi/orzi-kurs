# Medium — rekurencja na strukturach zagnieżdżonych

## 1. `sumNested(value)`

`value` to liczba albo tablica zawierająca liczby i/lub kolejne takie tablice (dowolna
głębokość). Zwróć sumę wszystkich liczb.

```js
sumNested(5);                    // 5
sumNested([1, 2, 3]);            // 6
sumNested([1, [2, [3, 4]], 5]);  // 15
sumNested([]);                   // 0
```

## 2. `treeSum(node)`

`node` to węzeł drzewa `{ value, children }`, gdzie `children` to tablica węzłów
(może być pusta lub pominięta). Zwróć sumę `value` wszystkich węzłów w drzewie.
(Wariacja przykładu „sum salaries" z javascript.info.)

```js
treeSum({ value: 1, children: [] });                    // 1
treeSum({
  value: 1,
  children: [{ value: 2, children: [] }, { value: 3 }],
});                                                      // 6
```
