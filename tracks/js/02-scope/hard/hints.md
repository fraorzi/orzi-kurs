## Hint 1

Wszyscy strzelcy zwracają `return i` — a `i` to jedna, wspólna zmienna
zadeklarowana PRZED pętlą `while`. Kiedy strzelec jest wywoływany (po pętli),
`i` ma już wartość 10. Domknięcie trzyma referencję do zmiennej, nie kopię
wartości z chwili utworzenia funkcji.

## Hint 2

Trzy poprawne naprawy:

1. **`for (let i = 0; i < 10; i++)`** — `let` w nagłówku `for` tworzy nową
   zmienną na każdą iterację; każdy strzelec domyka własną,
2. **kopia lokalna**: wewnątrz `while` dodaj `const j = i` i zwracaj `j` —
   `const` w bloku iteracji to za każdym razem nowa zmienna,
3. (historyczne) IIFE: opakuj tworzenie strzelca w natychmiast wywołaną funkcję
   z parametrem `(function (j) { ... })(i)`.

## Hint 3

Najkrótsza wersja:

```js
for (let i = 0; i < 10; i++) {
  shooters.push(() => i);
}
```
