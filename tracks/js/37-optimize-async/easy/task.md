# Easy [O] - loadAll: sekwencyjnie → równolegle

Tryb: optymalizacja. Popraw istniejący kod w `starter.js`, zachowując wymagane wyniki. Kryterium wydajności podano poniżej.

`loadAll(ids, loadOne)` zwraca tablicę wyników `loadOne(id)` w kolejności `ids`. Operacje
są **niezależne**.

Kod jest **poprawny**, ale robi je **sekwencyjnie** (`await` w pętli) - każda czeka na
poprzednią. Bramka mierzy współbieżność licznikiem (`maxActive`): przy poprawnej wersji
wiele operacji jest aktywnych naraz. Przepisz na równoległe, zachowując kolejność wyników.

```js
await loadAll([1, 2, 3], loadOne); // [loadOne(1), loadOne(2), loadOne(3)]
```

Podpowiedź kierunkowa: jak wystartować wszystkie operacje naraz i poczekać na komplet,
nie tracąc kolejności?
