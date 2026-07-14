## Hint 1

Pętla `while (true)`: w każdej rundzie `await fetchPage(cursor)`, wypuść elementy strony,
sprawdź `next`. Pierwszy kursor to `undefined` (deklaracja `let cursor;` bez wartości).

## Hint 2

`yield* items` deleguje do tablicy — wyrzuca po kolei wszystkie jej elementy (to samo co
`for (const it of items) yield it`). Warunek stopu sprawdzaj **po** wyieldowaniu strony:

```js
export async function* paginate(fetchPage) {
  let cursor;
  while (true) {
    const { items, next } = await fetchPage(cursor);
    yield* items;
    if (next === null || next === undefined) return; // ostatnia strona
    cursor = next;
  }
}
```

Nie pobieraj następnej strony „na zapas" — dopiero kolejny obrót pętli, wymuszony przez
konsumenta, woła `fetchPage` ponownie. To właśnie daje leniwość.
