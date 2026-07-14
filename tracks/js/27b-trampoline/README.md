# Trampolina i iteracyjne alternatywy rekurencji

Głęboka rekurencja przepełnia stos wywołań: `RangeError: Maximum call stack size exceeded`.
JS (poza wąskimi przypadkami) **nie ma** optymalizacji wywołań ogonowych (TCO), więc nawet
rekurencja ogonowa rośnie na stosie. Dwa sposoby, by liczyć „głęboko" bez przepełnienia:
**trampolina** i **jawny stos** (iteracja).

## Problem

```js
function sumTo(n) {
  return n === 0 ? 0 : n + sumTo(n - 1);
}
sumTo(100000); // 💥 RangeError: Maximum call stack size exceeded
```

Każde wywołanie czeka na wynik następnego — 100 000 ramek na stosie naraz.

## Trampolina

Zamiast **wołać** siebie, funkcja **zwraca funkcję** („thunk") opisującą następny krok.
Pętla (`trampoline`) rozwija te kroki jeden po drugim — na stosie jest zawsze **jedna** ramka.

```js
function trampoline(fn) {
  return (...args) => {
    let result = fn(...args);
    while (typeof result === "function") {
      result = result(); // rozwiń kolejny krok
    }
    return result;
  };
}

const sumTo = trampoline(function rec(n, acc = 0) {
  return n === 0 ? acc : () => rec(n - 1, acc + n); // zwróć thunk, nie wołaj
});
sumTo(100000); // 5000050000 — bez przepełnienia
```

Klucz: krok rekurencyjny **zwraca** `() => rec(...)`, a nie `rec(...)`. Pętla `while` bierze
na siebie to, co robił stos. Działa też dla **rekurencji wzajemnej** (`isEven`/`isOdd`) —
obie funkcje zwracają thunki tej drugiej.

## Jawny stos (iteracja)

Dla przechodzenia struktur (drzewa, zagnieżdżone tablice) często prościej trzymać własny
**stos danych** i pętlę `while`, zamiast rekurencji:

```js
function flatten(input) {
  const out = [];
  const stack = [input];
  while (stack.length > 0) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      for (let i = item.length - 1; i >= 0; i--) stack.push(item[i]);
    } else {
      out.push(item);
    }
  }
  return out;
}
```

Stos to zwykła tablica na stercie (heap) — rośnie tam, gdzie jest dużo pamięci, a nie na
ograniczonym stosie wywołań.

## Kiedy używać

- Głębokość zależna od **danych** (rekursja może sięgnąć dziesiątek tysięcy) — parsery,
  przechodzenie głębokich drzew/list, algorytmy na dużych wejściach.
- Rekurencja ogonowa / akumulatorowa, którą chcesz uruchamiać na dużych `n`.

## Kiedy unikać

- Płytka, ograniczona rekurencja (drzewo DOM, mały JSON) — czytelna rekurencja jest lepsza,
  nie komplikuj.
- Gdy rozwiązanie iteracyjne jest naturalne od początku (pętla po tablicy) — nie „udawaj"
  rekurencji.

## Pułapki

- Trampolina wymaga, by krok **zwracał thunk** (`() => rec(...)`), a nie wołał `rec(...)` —
  łatwo pomylić i wtedy nadal przepełnisz stos.
- Akumulator (`acc`) niesie wynik między krokami — inaczej w wersji ogonowej nie ma gdzie go
  trzymać.
- Trampolina ma narzut (alokacja domknięcia na krok) — używaj tam, gdzie problem to
  **głębokość**, nie tam, gdzie liczy się mikro-wydajność.
- Jawny stos odwraca kolejność, jeśli nie wrzucisz elementów w odpowiednim porządku
  (dla zachowania kolejności wrzucaj dzieci od końca).
