# Medium — paginacja jako strumień

Zaimplementuj **async generator** `paginate(fetchPage)`, który „wylewa" elementy z
paginowanego źródła jako jeden strumień.

`fetchPage(cursor)` zwraca `Promise<{ items, next }>`:

- `items` — tablica elementów tej strony,
- `next` — kursor następnej strony albo `null`/`undefined`, gdy to ostatnia strona.

Pierwsze wywołanie rób z kursorem `undefined`. Yielduj kolejno wszystkie elementy każdej
strony, potem przechodź do następnej, aż `next` będzie `null`.

```js
// strona start: {items:[1,2], next:"p1"}, p1: {items:[3], next:"p2"}, p2: {items:[4,5], next:null}
const out = [];
for await (const x of paginate(fetchPage)) out.push(x);
out; // [1, 2, 3, 4, 5]
```

Kluczowe: generator jest **leniwy** — kolejnej strony nie wolno pobierać, zanim konsument
nie wyczerpie poprzedniej. Test policzy wywołania `fetchPage`: dla 3 stron ma być
dokładnie 3 (ani jednego pobrania „w zapas").
