# Easy — klucze, wartości, nowe obiekty

Zaimplementuj w `starter.js` trzy funkcje (dwie pierwsze to zadania
z javascript.info).

## 1. `countProps(obj)`

Liczba własnych właściwości obiektu.

```js
countProps({ a: 1, b: 2 }); // 2
countProps({});             // 0
```

## 2. `sumSalaries(salaries)`

Suma wszystkich wartości obiektu. Pusty obiekt → `0`.

```js
sumSalaries({ John: 100, Ann: 160, Pete: 130 }); // 390
sumSalaries({});                                 // 0
```

## 3. `renameKey(obj, from, to)`

**Nowy** obiekt, w którym klucz `from` nazywa się `to` (wartość bez zmian),
a pozostałe klucze zostają. Wejście nie może być zmutowane. Gdy `from`
nie istnieje — zwróć kopię obiektu.

```js
renameKey({ name: "Ala", age: 30 }, "name", "fullName");
// { fullName: "Ala", age: 30 }
```
