# Hard [O] - część wspólna: iteruj po mniejszym zbiorze

Tryb: optymalizacja. Popraw istniejący kod w `starter.js`, zachowując wymagane wyniki. Kryterium wydajności podano poniżej.

`sharedTags(userTags, catalog)` zwraca **posortowaną** tablicę tagów obecnych w obu
zbiorach. `userTags` to mały `Set` (kilkaset pozycji), `catalog` to ogromny `Set`,
który rośnie z czasem.

Kod jest **poprawny**, ale iteruje po **całym katalogu** - czas rośnie liniowo z jego
rozmiarem, mimo że wynik nigdy nie może być większy niż `userTags`. Testy poprawności
przechodzą - obleje benchmark. Przepisz tak, by czas **nie zależał** od rozmiaru katalogu:
iteruj po mniejszym zbiorze, a w większym tylko sprawdzaj `has()` (O(1)).

```js
sharedTags(new Set(["b", "a", "x"]), new Set(["a", "b", "c"])); // ["a", "b"]
sharedTags(new Set(["q"]), new Set(["a", "b"]));                 // []
```

Kontrakt bez zmian: te same wyniki, brak mutacji wejścia. To ta sama zasada, którą
widziałeś w `intersection` na poziomie medium - tu egzekwuje ją benchmark
(`expect: "constant"` przy rosnącym katalogu).
