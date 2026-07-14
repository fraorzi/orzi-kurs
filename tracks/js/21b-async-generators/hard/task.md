# Hard — leniwe `firstN` na strumieniu async

Zaimplementuj **async generator** `firstN(asyncIterable, n)`, który yielduje **pierwsze `n`**
elementów źródła i przestaje — nie ciągnąc z niego ani jednego elementu więcej.

```js
const out = [];
for await (const x of firstN(asyncRange(1, 1000), 3)) out.push(x);
out; // [1, 2, 3]
```

- Dla `n <= 0` nie produkuj nic (i nie dotykaj źródła).
- Gdy źródło ma mniej niż `n` elementów, zwróć tyle, ile jest.

Kluczowa jest **leniwość**: gdy źródłem jest kosztowny strumień (paginacja, sieć), `firstN`
nie może pobierać elementów ponad te `n`, których naprawdę potrzeba. Test podłączy licznik
pobrań i sprawdzi, że przy dużym/nieskończonym źródle pobierasz dokładnie `n` elementów,
a nie całość.
