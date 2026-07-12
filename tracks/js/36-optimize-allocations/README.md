# [O] Optymalizacja: alokacje i kopie

Zagadnienie **optymalizacyjne**: starter działa poprawnie, ale w każdej iteracji tworzy
nową kopię rosnącej struktury — sumarycznie O(n²) kopiowania. Przepisz tak, by budować
wynik bez powielania, nie zmieniając kontraktu. Startery oblewają benchmark skalowania.

## Spread akumulatora w pętli → mutacja lokalnego bufora

`[...acc, x]` **kopiuje** cały akumulator za każdym razem. W pętli po `n` elementach
kopiujesz 1 + 2 + … + n ≈ n²/2 elementów:

```js
// O(n²): każdy krok kopiuje całe acc
arrays.reduce((acc, arr) => [...acc, ...arr], []);

// O(n): jeden bufor, dokładanie na miejscu
const out = [];
for (const arr of arrays) out.push(...arr); // albo: arrays.flat()
return out;
```

Niemutowalność jest cenna **na granicy** funkcji (nie mutuj cudzych danych), ale wewnątrz
funkcji mutacja **lokalnego** bufora i zwrócenie go na końcu jest szybkie i bezpieczne —
nikt z zewnątrz tej mutacji nie widzi.

## Spread obiektu w reduce → jeden cel

To samo dla obiektów: `{ ...acc, ...o }` kopiuje wszystkie dotychczasowe klucze co iterację:

```js
// O(n²)
objects.reduce((acc, o) => ({ ...acc, ...o }), {});

// O(n): scal do jednego obiektu
Object.assign({}, ...objects);
```

## Wielokrotne `filter` → jedno przejście z `Set`

Filtrowanie w pętli/`reduce` tworzy nową tablicę przy każdym kroku i przechodzi ją całą:

```js
// O(k·n): dla każdej usuwanej wartości pełny filter
toRemove.reduce((acc, val) => acc.filter((x) => x !== val), arr);

// O(n): jeden filter z testem przynależności w O(1)
const remove = new Set(toRemove);
arr.filter((x) => !remove.has(x));
```

## Kiedy NIE optymalizować

- Mała, stała liczba elementów — `[...acc, x]` w pętli po kilku pozycjach jest nieszkodliwe
  i bywa czytelniejsze.
- Kod poza gorącą ścieżką — niemutowalny, deklaratywny styl jest wart swojej ceny.
- Gdy potrzebujesz historii wersji (każdy krok jako osobny stan) — tam kopie są celem,
  nie marnotrawstwem.

## Pułapki

- **Mutuj tylko LOKALNY bufor.** Nigdy nie mutuj tablicy/obiektu przekazanego jako
  argument — to zmienia dane wołającego.
- `push(...arr)` rozkłada `arr` na argumenty — przy **bardzo** dużych tablicach grozi
  przekroczeniem limitu argumentów; wtedy pętla `for` albo `arrays.flat()`.
- `Object.assign(cel, ...)` mutuje `cel` — podawaj świeży `{}`, nie cudzy obiekt.
- Kolejność przy scalaniu obiektów: późniejsze klucze nadpisują wcześniejsze (jak przy spreadzie).
