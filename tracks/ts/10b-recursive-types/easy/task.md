# Easy — `DeepReadonly` i `deepFreeze`

Zaimplementuj rekurencyjny typ `DeepReadonly<T>` dla:

- prymitywów,
- funkcji (pozostają bez zmian),
- readonly i mutowalnych tablic,
- zwykłych obiektów.

Zaimplementuj też `deepFreeze(value)`, która rekurencyjnie zamraża acykliczną
konfigurację przez `Object.freeze` i zwraca `DeepReadonly<T>`.

Typ readonly i zachowanie runtime mają być zgodne; nie wystarczy samo rzutowanie.
