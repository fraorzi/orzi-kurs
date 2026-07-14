# Async generatory i `for await...of`

Zwykły generator (`function*`) produkuje wartości **synchronicznie**. Async generator
(`async function*`) może `await` między `yield` — czyli produkować wartości, które trzeba
najpierw **poczekać** (odczyt z sieci, pliku, strumienia). Konsumujesz go pętlą
`for await...of`.

```js
async function* range(start, end) {
  for (let i = start; i < end; i++) {
    yield i; // między yieldami wolno await-ować
  }
}

for await (const n of range(1, 4)) console.log(n); // 1, 2, 3
```

## Protokół async iteracji

- Obiekt jest **async iterable**, gdy ma metodę `[Symbol.asyncIterator]()` zwracającą async
  iterator (z metodą `next()` zwracającą `Promise<{ value, done }>`).
- `async function*` automatycznie tworzy taki obiekt — nie musisz pisać protokołu ręcznie.
- `for await...of` w każdej iteracji robi `await` na wyniku `next()`. Działa też na zwykłych
  iterablach obietnic, ale najczęściej łączysz go z async generatorem.

## Po co to — leniwe strumienie i paginacja

Kanoniczny przypadek: **paginacja**. Masz API oddające dane stronami z kursorem. Async
generator pozwala „przelać" wszystkie elementy jako jeden strumień, dociągając kolejne strony
dopiero, gdy konsument ich zażąda:

```js
async function* paginate(fetchPage) {
  let cursor;
  while (true) {
    const { items, next } = await fetchPage(cursor); // await w środku
    yield* items;                                     // oddaj elementy strony
    if (next == null) return;                         // nie ma kolejnej strony
    cursor = next;
  }
}
```

Bo generator jest **leniwy**, kolejna strona pobiera się dopiero, gdy konsument poprosi o
element, którego jeszcze nie ma. Przerwiesz konsumpcję wcześniej → reszta stron nigdy się
nie pobierze.

## Kiedy używać

- Strumienie danych, których nie chcesz (albo nie możesz) trzymać w całości w pamięci.
- Paginowane API — jeden „strumień elementów" zamiast ręcznego sklejania stron.
- Źródła nieskończone / kosztowne, z których bierzesz tylko początek.

## Kiedy unikać

- Gdy masz już całą tablicę w pamięci — zwykły `for...of` / metody tablic są prostsze.
- Gdy potrzebujesz **równoległości** wszystkich elementów naraz — async generator jest
  z natury sekwencyjny (jeden `await` po drugim). Do równoległości użyj `Promise.all`.

## Pułapki

- `for await...of` przetwarza elementy **sekwencyjnie** — każdy `await` czeka na poprzedni.
  To nie jest sposób na współbieżność.
- Async generator jest **leniwy**: sam `paginate(...)` nic nie pobiera, dopóki nie zaczniesz
  po nim iterować.
- Przerwanie pętli (`break`/`return`/wyjątek) woła `.return()` na iteratorze — generator
  kończy się, jakby w miejscu `yield` wykonał `return`: z kodu po `yield` wykonają się
  **tylko bloki `finally`** (tam rób cleanup); reszta źródła już nie.
- `yield*` deleguje do innego iterowalnego (np. `yield* items`) — wygodne do „wylania" strony.
