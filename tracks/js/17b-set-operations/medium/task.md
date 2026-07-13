# Medium — ręczne operacje na zbiorach

Tym razem **bez** wbudowanych metod (`intersection`, `union`, `difference`, `isSubsetOf` itd.) —
zaimplementuj je samodzielnie, żeby zrozumieć mechanikę i złożoność. Wszystkie funkcje
przyjmują `Set`-y i **nie mutują** argumentów.

## 1. `intersection(a, b)` → `Set`

Elementy obecne w obu zbiorach. Iteruj po **mniejszym** zbiorze i sprawdzaj `has()` w większym.

## 2. `difference(a, b)` → `Set`

Elementy z `a`, których nie ma w `b`.

## 3. `isSubset(a, b)` → `boolean`

`true`, gdy każdy element `a` należy do `b`.

```js
intersection(new Set([1, 2, 3]), new Set([2, 3, 4])); // Set {2, 3}
difference(new Set([1, 2, 3]), new Set([2, 3, 4]));    // Set {1}
isSubset(new Set([1, 2]), new Set([1, 2, 3]));         // true
isSubset(new Set([1, 9]), new Set([1, 2, 3]));         // false
```

Klucz to `Set.prototype.has()` w O(1) — dzięki niemu każda z tych operacji jest liniowa.
