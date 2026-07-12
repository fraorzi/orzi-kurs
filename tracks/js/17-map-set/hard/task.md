# Hard — operacje na zbiorach w czasie liniowym

Zaimplementuj trzy operacje na zbiorach reprezentowanych jako tablice. Każda zwraca
**nową tablicę z unikalnymi** elementami, w kolejności pierwszych wystąpień w `a`.
Naiwne `a.filter(x => b.includes(x))` daje **O(n·m)** — będzie benchmark wymagający
złożoności liniowej. Klucz: zamień `b` na `Set` i pytaj `set.has(x)` w O(1).

## 1. `intersection(a, b)` — część wspólna

Elementy obecne w `a` **i** w `b`.

```js
intersection([1, 2, 3, 4], [2, 4, 6]); // [2, 4]
intersection([1, 1, 2], [1, 2]);       // [1, 2] — wynik bez duplikatów
```

## 2. `union(a, b)` — suma

Wszystkie elementy z `a` i `b`, bez duplikatów, w kolejności pojawienia się.

```js
union([1, 2], [2, 3]); // [1, 2, 3]
```

## 3. `difference(a, b)` — różnica

Elementy z `a`, których **nie ma** w `b`.

```js
difference([1, 2, 3], [2]); // [1, 3]
```
