# Hard [O] - pierwsze k wyników bez przetwarzania całości

Tryb: optymalizacja. Popraw istniejący kod w `starter.js`, zachowując wymagane wyniki. Kryterium wydajności podano poniżej.

`firstTransformed(items, transform, keep, k)` zwraca **pierwsze `k`** przekształconych
elementów (`transform`), które przechodzą `keep`.

Kod jest **poprawny**, ale robi za dużo: `items.map(transform).filter(keep).slice(0, k)`
woła `transform` na **wszystkich** elementach i alokuje dwie tablice pośrednie - nawet gdy
potrzebujesz tylko pierwszych `k`. Gdy `items` jest duże, a `transform` kosztowne, to marnotrawstwo.

Przepisz leniwie iterator helpers, tak by `transform` był wołany **tylko do momentu**
zebrania `k` wyników.

```js
firstTransformed([0, 1, 2, 3, 4, 5], (x) => x * 2, (v) => v % 4 === 0, 2); // [0, 4]
```

Kontrakt bez zmian (ten sam wynik), ale liczba wywołań `transform` ma być zależna od `k`,
nie od długości `items`. Test policzy wywołania `transform` - dla dużego wejścia i małego `k`
ma ich być garść, nie tyle, ile elementów.
