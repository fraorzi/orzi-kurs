## Hint 1

1 ms = 1e6 ns. Dwa miejsca po przecinku: `Math.round(ns / 1e4) / 100`.

## Hint 2

`degraded` porównuje **zaokrągloną** wartość `p99Ms` z budżetem — i jest
ostrą nierównością (`>`), test graniczny to sprawdza.

## Hint 3

Wydziel lokalną funkcję `nsToMs` — trzy pola, jedna konwersja, zero kopii.
