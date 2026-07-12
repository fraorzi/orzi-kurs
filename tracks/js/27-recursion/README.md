# Rekurencja

Funkcja rekurencyjna wywołuje samą siebie na **mniejszym** podproblemie, aż dojdzie do
przypadku, którego nie trzeba już rozbijać. Dwie części są obowiązkowe:

- **przypadek bazowy** — warunek stopu (bez niego nieskończona rekurencja i przepełnienie
  stosu),
- **krok rekurencyjny** — zejście na mniejszy problem, złożenie wyniku.

```js
function factorial(n) {
  if (n <= 1) return 1;        // baza
  return n * factorial(n - 1); // krok: mniejszy problem
}
factorial(5); // 120
```

## Stos wywołań

Każde wywołanie odkłada ramkę na stosie i czeka na wynik zagnieżdżonego. Dopiero po
osiągnięciu bazy stos się „zwija", składając wynik. To dlatego zbyt głęboka rekurencja
rzuca `RangeError: Maximum call stack size exceeded` (w praktyce ~10⁴–10⁵ ramek).

## Rekurencja na strukturach zagnieżdżonych

Rekurencja świeci tam, gdzie dane mają **nieznaną głębokość**: zagnieżdżone tablice,
drzewa (`{ value, children }`), JSON. Wzorzec: dla węzła policz jego wkład i zejdź
rekurencyjnie w dzieci.

```js
function treeSum(node) {
  let sum = node.value;
  for (const child of node.children ?? []) {
    sum += treeSum(child); // suma poddrzewa
  }
  return sum;
}
```

## Rekurencja vs iteracja

- Płaska sekwencja / prosty licznik → **pętla** (czytelniej, brak ryzyka przepełnienia stosu).
- Struktura o zmiennej głębokości (drzewo, graf, backtracking) → **rekurencja** (kod
  odzwierciedla kształt danych).
- Każdą rekurencję da się zamienić na iterację z **własnym stosem** (tablica jako stos) —
  przydatne, gdy grozi przepełnienie natywnego stosu.

## Uwaga o tail call

JS specyfikuje optymalizację wywołań ogonowych (TCO), ale silniki (V8/Node) jej **nie
implementują** — nie licz na to, że „rekurencja ogonowa" ochroni Cię przed przepełnieniem.
Dla bardzo głębokich problemów użyj iteracji lub trampoliny.

## Kiedy używać

- Przechodzenie drzew/grafów (DOM, AST, system plików, JSON).
- Backtracking (ścieżki, permutacje, sudoku).
- Dziel i zwyciężaj (sortowania, wyszukiwanie binarne).

## Kiedy unikać

- Prosta iteracja po tablicy/liczniku — pętla jest jaśniejsza i szybsza.
- Bardzo głębokie/nieznane wejścia bez limitu → ryzyko przepełnienia stosu; wybierz
  iterację z jawnym stosem.
- Nakładające się podproblemy liczone wielokrotnie (naiwne Fibonacci) → wykładniczy czas;
  dodaj memoizację albo przejdź na iterację.

## Pułapki

- **Brak przypadku bazowego** albo baza, której nie da się osiągnąć → nieskończona
  rekurencja i `RangeError`.
- Krok, który nie **zmniejsza** problemu (np. `factorial(n)` wołające `factorial(n)`).
- Naiwna rekurencja z powtarzaniem obliczeń (Fibonacci) → O(2ⁿ); memoizuj.
- Mutowanie współdzielonej struktury między wywołaniami zamiast składania wyniku zwrotnie.
- Zapomniane `return` przy zwracaniu wyniku rekurencyjnego wywołania.
