# Operacje na zbiorach (Set methods)

`Set` od zawsze miał `add`/`has`/`delete`, ale operacje algebry zbiorów trzeba było pisać
ręcznie. Od ES2025 (Node 22+) `Set` ma je wbudowane — wszystkie zwracają **nowy** `Set`
i nie mutują argumentów:

```js
const a = new Set([1, 2, 3, 4]);
const b = new Set([3, 4, 5]);

a.union(b);               // {1, 2, 3, 4, 5}
a.intersection(b);        // {3, 4}
a.difference(b);          // {1, 2}         — w a, ale nie w b
a.symmetricDifference(b); // {1, 2, 5}      — w dokładnie jednym z nich
```

Oraz trzy predykaty zwracające `boolean`:

```js
new Set([3, 4]).isSubsetOf(a);   // true  — każdy element {3,4} jest w a
a.isSupersetOf(new Set([3, 4]));  // true
a.isDisjointFrom(new Set([9]));   // true  — brak wspólnych elementów
```

## Argument to „set-like", nie tablica

Metody przyjmują obiekt **set-like**: musi mieć `size`, `has()` i `keys()`. Zwykła tablica
tego nie spełnia — `a.intersection([3, 4])` rzuci błędem. Najpierw `new Set(tablica)`.

## Złożoność i po co to

Kluczowa zaleta zbioru to `has()` w czasie **O(1)**. Sprawdzanie przynależności przez
`array.includes()` jest O(n), więc „dla każdego z n elementów sprawdź, czy jest w tablicy m"
to O(n·m). Zamiana jednej strony na `Set` robi z tego O(n + m):

```js
// wolno: O(n·m)
a.filter((x) => b.includes(x));
// szybko: O(n + m)
const setB = new Set(b);
a.filter((x) => setB.has(x));
```

## Równoważniki ręczne (gdy chcesz zrozumieć mechanikę)

```js
// część wspólna: iteruj MNIEJSZY zbiór, sprawdzaj w większym
function intersection(a, b) {
  const [small, large] = a.size <= b.size ? [a, b] : [b, a];
  const out = new Set();
  for (const x of small) if (large.has(x)) out.add(x);
  return out;
}
```

## Kiedy używać zbioru

- Testy przynależności (`has`), usuwanie duplikatów, operacje algebry zbiorów.
- Gdy kolekcja rośnie i wielokrotnie pytasz „czy zawiera X".

## Kiedy zostać przy tablicy

- Gdy potrzebujesz **kolejności z duplikatami**, indeksowania po pozycji albo metod jak
  `map`/`reduce` na wszystkich elementach — `Set` duplikaty gubi.
- Dla kilku elementów sprawdzanych raz `includes` na tablicy jest prostsze i wystarczające
  (budowa `Set` też kosztuje).

## Pułapki

- Metody zbiorów wymagają **set-like** — przekazanie zwykłej tablicy rzuca błąd.
- `Set` porównuje elementy przez tożsamość (SameValueZero): dwa różne obiekty o tej samej
  treści to **dwa różne** elementy; `NaN` jest równe samemu sobie.
- Wynik zawsze jest nowym `Set` — operacje nie modyfikują `a` ani `b`.
