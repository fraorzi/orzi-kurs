# Hints

## Hint 1

`received === expected` porównuje znak po znaku i kończy przy pierwszej
różnicy — czas odpowiedzi zdradza, ile początkowych znaków się zgadza.
Potrzebujesz porównania, które trwa tyle samo niezależnie od tego, gdzie
jest różnica: `node:crypto`'s `timingSafeEqual` na dwóch `Buffer`ach.

## Hint 2

`timingSafeEqual` rzuca błędem, gdy bufory mają różną długość — musisz
sprawdzić `left.length === right.length` **przed** wywołaniem, nie
wewnątrz `try/catch`. Różna długość to od razu `false`, bez porównania.

## Hint 3

`received` może być `undefined` — odrzuć to najpierw. Osobno: `solve("",
"")` ma zwrócić `false`, nie `true` — pusty string jest długości 0 po
obu stronach, więc sam strażnik długości go nie złapie.
