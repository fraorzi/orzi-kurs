# Hard [D] — sekwencyjny await zamiast równoległego

`fetchAll(ids, fetchOne)` pobiera dane dla każdego `id`. Operacje są **niezależne**, więc
powinny lecieć **równolegle** — obecny kod robi je **sekwencyjnie** (`await` w pętli czeka
na każde przed następnym), co jest wielokrotnie wolniejsze. Przepisz na równoległe,
zachowując kolejność wyników zgodną z `ids`.

Test sprawdza współbieżność licznikiem (`maxActive`), nie czasem: przy poprawnej wersji
wiele pobrań jest aktywnych naraz.

```js
// oczekiwane: wyniki w kolejności ids, pobrania równoległe
await fetchAll([1, 2, 3, 4], fetchOne); // [f(1), f(2), f(3), f(4)]
```

Uwaga: równoległość jest właściwa **tylko dla niezależnych** operacji. Gdyby krok zależał
od poprzedniego wyniku, sekwencyjny `await` byłby poprawny.
