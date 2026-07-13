# Iterator helpers (leniwe pipeline'y)

Metody tablic (`map`, `filter`, `slice`) tworzą **tablicę pośrednią** na każdym kroku i
przetwarzają **wszystkie** elementy. Iterator helpers (ES2025, Node 22+) robią to samo
**leniwie**, na iteratorach — bez tablic pośrednich i tylko dla tylu elementów, ile naprawdę
potrzeba:

```js
[1, 2, 3, 4, 5].values()      // iterator tablicy
  .filter((x) => x % 2 === 0)  // leniwe
  .map((x) => x * 10)          // leniwe
  .take(2)                     // zatrzymaj po 2
  .toArray();                  // [20, 40] — dopiero tu następuje przetwarzanie
```

## Dostępne metody

Na `Iterator.prototype`:

- **transformujące (leniwe)**: `map`, `filter`, `take(n)`, `drop(n)`, `flatMap`,
- **kończące (konsumują iterator)**: `toArray`, `forEach`, `reduce`, `some`, `every`,
  `find`.

Metody leniwe zwracają nowy iterator (Iterator Helper), nie liczą nic z góry. Dopiero metoda
kończąca „ciągnie" wartości ze źródła.

## Skąd wziąć iterator

Wiele rzeczy już nim jest albo łatwo go dać:

```js
[1, 2, 3].values();          // iterator tablicy
new Set([1, 2]).values();    // iterator zbioru
map.entries();               // iterator wpisów Map
function* gen() { … }        // generator zwraca iterator
Iterator.from(iterowalne);   // owija dowolny iterable/iterator
```

## Dlaczego leniwie — dwie realne zalety

1. **Działa na nieskończonych i bardzo dużych źródłach.** `map` na tablicy nieskończonego
   generatora zawiesiłby program; `.take(n)` na iteratorze pobiera tylko `n` elementów.
2. **Mniej pracy i pamięci.** `arr.map(f).filter(g).slice(0, k)` woła `f` na **wszystkich**
   elementach i alokuje dwie tablice pośrednie. Wersja na iteratorze woła `f` tylko do
   momentu zebrania `k` wyników — reszty źródła nie dotyka.

## Kiedy używać

- Strumienie i nieskończone/leniwe sekwencje (generatory, `readline`, paginacja).
- Gdy z dużego źródła bierzesz **pierwsze k** pasujących — leniwość oszczędza pracę.
- Gdy chcesz uniknąć tablic pośrednich w długim pipeline.

## Kiedy unikać

- Dla małej tablicy, którą i tak przetwarzasz w całości — metody tablic są czytelniejsze
  i równie szybkie (a masz na wyniku indeksowanie, `length`, kolejne metody tablicowe).
- Gdy potrzebujesz dostępu swobodnego albo wielokrotnego przejścia — iterator jest
  **jednorazowy** (patrz pułapki).

## Pułapki

- **Iterator jest jednorazowy.** Po przejściu (albo po metodzie kończącej) jest wyczerpany —
  drugie `toArray()` da `[]`. Chcesz przejść dwa razy → utwórz iterator na nowo albo
  zmaterializuj do tablicy.
- Metody leniwe **nic nie liczą**, dopóki nie wywołasz metody kończącej — sam `map` bez
  `toArray`/`forEach` nie „uruchomi się".
- `take(n)`/`drop(n)` dla `n` ujemnego lub nie-liczby rzucają `RangeError`.
- Nie myl z metodami tablic: iterator helper nie ma `length`, `slice`, indeksowania.
